<template>
  <q-dialog ref="importTeamsDialogRef">
    <div class="full-width" style="max-width: 600px">
      <q-form @submit="saveImportTeams">
        <q-card>
          <q-card-section class="row items-center q-pb-md">
            <div class="text-h6">Add Teams</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-md">
            <div
              class="column q-pa-sm"
              v-for="(team, index) in newImportTeams"
              :key="team.id"
            >
              <div class="row justify-center">
                <div class="col-5">
                  <q-select
                    class="q-ml-sm"
                    square
                    outlined
                    dense
                    v-model="team.team"
                    :options="teamsNotInSeason"
                    option-label="name"
                    option-value="id"
                    emit-value
                    map-options
                    label="Team"
                    :rules="teamSelectRules"
                  />
                </div>
                <div class="col-5">
                  <q-select
                    class="q-ml-sm"
                    square
                    outlined
                    dense
                    v-model="team.season_division"
                    :options="seasonDivisionsInSeason"
                    option-label="divisionName"
                    option-value="id"
                    emit-value
                    map-options
                    label="Division"
                    :rules="divisionSelectRules"
                  />
                </div>
                <div class="col-1">
                  <q-btn
                    v-if="index > 0"
                    class="q-ml-sm"
                    icon="delete"
                    size="md"
                    flat
                    @click="removeImportTeamField(index)"
                  />
                </div>
                <div class="col-1">
                  <q-btn
                    class="q-ml-sm"
                    icon="add"
                    size="md"
                    flat
                    @click="addImportTeamField"
                  />
                </div>
              </div>
            </div>
            <q-separator />
            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="Cancel" />
              <q-btn color="primary" type="submit" label="Add Teams" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useDivisionStore } from "stores/division";
import { storeToRefs } from "pinia/dist/pinia";
import { useTeamStore } from "stores/team";

export default {
  name: "ImportTeamDialog",
  setup() {
    const divisionStore = useDivisionStore();
    const { seasonDivisionsInSeason } = storeToRefs(divisionStore);
    const { getSeasonDivisionsInSeason } = divisionStore;
    getSeasonDivisionsInSeason();

    const teamStore = useTeamStore();
    const { teamsNotInSeason } = storeToRefs(teamStore);
    const { getTeamsNotInSeason, importTeams } = teamStore;
    getTeamsNotInSeason();

    const newImportTeams = ref([]);
    newImportTeams.value.push({
      team: "",
      season_division: "",
    });

    function addImportTeamField() {
      newImportTeams.value.push({
        team: "",
        season_division: "",
      });
    }

    function removeImportTeamField(index) {
      newImportTeams.value.splice(index, 1);
    }
    function saveImportTeams() {
      importTeams(newImportTeams.value);
      importTeamsDialogRef.value.hide();
    }

    const importTeamsDialogRef = ref(null);

    return {
      newImportTeams,
      importTeamsDialogRef,
      seasonDivisionsInSeason,
      teamsNotInSeason,
      addImportTeamField,
      removeImportTeamField,
      saveImportTeams,
      divisionSelectRules: [
        (val) => (val && val.length > 0) || "Please Make a Selection",
      ],
      teamSelectRules: [
        (val) => (val && val.length > 0) || "Please Make a Selection",
      ],
    };
  },
};
</script>
