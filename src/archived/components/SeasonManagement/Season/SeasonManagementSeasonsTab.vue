<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-lg">
      <div class="row justify-center">
        <div class="col-10">

          <q-card>
            <q-card-section>
              <div class="row">
                <div class="col-4 justify-start">
                  <q-input v-model="search" type="search" dense >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
                <div class="col-8 text-right">
                  <q-btn color="primary" label="Add Season" @click="addSeason"/>
                </div>
              </div>
            </q-card-section>
          </q-card>

        </div>
      </div>

      <div v-for="season in seasons" :key="season.id" class="row justify-center">
        <SeasonCard :season-name="season.name" :start-date="season.startDate" :end-date="season.endDate" :season-id="season.id" />
      </div>

    </div>
  </div>
</template>

<script>
import SeasonCard from "src/archived/components/SeasonManagement/Season/SeasonCard.vue";
import { useSeasonStore } from "stores/season";
import { storeToRefs } from "pinia/dist/pinia";
import { useQuasar } from "quasar";
import { ref } from "vue";
import AddSeasonDialog from "src/archived/components/SeasonManagement/Season/AddSeasonDialog.vue";
export default {
  name: 'SeasonManagementSeasonsTab',
  components: { SeasonCard },
  setup () {
    const seasonStore = useSeasonStore()
    const {seasons} = storeToRefs(seasonStore)
    const {getSeasons} = seasonStore
    const $q = useQuasar()
    const search = ref('')

    function addSeason () {
      $q.dialog({
        component: AddSeasonDialog
      })
    }

    getSeasons()

    return {
      search,
      seasons,
      addSeason
    }
  }
}
</script>
