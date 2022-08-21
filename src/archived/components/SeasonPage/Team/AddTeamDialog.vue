<template>
  <q-dialog ref="addTeamDialogRef">
    <div class="full-width" style="max-width: 600px">
      <q-form @submit="saveTeams">
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
              v-for="(team, index) in newTeams"
              :key="team.id"
            >
              <div class="row justify-center">
                <div class="col-5">
                  <q-input
                    square
                    outlined
                    dense
                    v-model="team.name"
                    type="text"
                    label="Team Name"
                    :rules="teamNameRules"
                  />
                </div>
                <div class="col-5">
                  <q-select
                    class="q-ml-sm"
                    square
                    outlined
                    dense
                    v-model="team.division"
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
                    @click="removeTeamField(index)"
                  />
                </div>
                <div class="col-1">
                  <q-btn
                    class="q-ml-sm"
                    icon="add"
                    size="md"
                    flat
                    @click="addTeamField"
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
  name: "AddTeamDialog",
  setup() {
    const divisionStore = useDivisionStore();
    const { seasonDivisionsInSeason } = storeToRefs(divisionStore);
    const { getSeasonDivisionsInSeason } = divisionStore;
    getSeasonDivisionsInSeason();

    const teamStore = useTeamStore();
    const {addTeams} = teamStore

    const newTeams = ref([]);
    newTeams.value.push({
      name: "",
      division: "",
    });

    function addTeamField() {
      newTeams.value.push({
        name: "",
        division: "",
      });
    }

    function removeTeamField(index) {
      newTeams.value.splice(index, 1);
    }
    function saveTeams() {
      console.log("Hit Save Teams");
      addTeams(newTeams.value)
      addTeamDialogRef.value.hide();
    }

    const addTeamDialogRef = ref(null);

    return {
      newTeams,
      addTeamDialogRef,
      seasonDivisionsInSeason,
      saveTeams,
      addTeamField,
      removeTeamField,
      teamNameRules: [
        (val) => (val && val.length > 0) || "Please type something",
      ],
      divisionSelectRules: [
        (val) => (val && val.length > 0) || "Please Make a Selection",
      ],
    };
  },
};
</script>
