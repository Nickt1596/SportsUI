<template>
  <q-dialog>
    <div class="full-width" style="max-width: 600px;">

    <q-card>

      <q-card-section class="row items-center q-pb-md">
        <div class="text-h6">Add Season</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-form>

        <q-card-section>
          <div class="col">

            <q-input square outlined dense v-model="season.name" type="text" label="Season Name *" stack-label hint="Example: YYYY Regular Season" :rules="seasonNameRules" ref="seasonNameRef" class="q-mb-lg"/>

            <div class="row">

              <q-input square outlined dense v-model="season.startDate" label="Season Start Date *" stack-label mask="####-##-##" :rules="startDateRules" ref="seasonStartDateRef" class="col q-mr-lg">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="season.startDate" minimal>
                        <q-btn v-close-popup flat label="close" />
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input square outlined dense v-model="season.endDate" label="Season End Date *" stack-label mask="####-##-##" :rules="endDateRules" ref="seasonEndDateRef" class="col">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" cover>
                      <q-date v-model="season.endDate" minimal>
                        <q-btn v-close-popup flat label="close" />
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Cancel" />
          <q-btn v-close-popup="closeDialog === true" color="primary" type="submit" label="Create" @click="onSubmit()"/>
        </q-card-actions>

      </q-form>
    </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useSeasonStore } from "stores/season";
import { storeToRefs } from "pinia/dist/pinia";

export default {
  name: 'AddSeasonDialog',
  setup () {
    const seasonStore = useSeasonStore()
    const {postSeasonResponse} = storeToRefs(seasonStore)
    const {postSeason} = seasonStore

    const season = ref({
      name: '',
      startDate: '',
      endDate: '',
      numGames: 5
    })
    const seasonNameRef = ref(null)
    const seasonStartDateRef = ref(null)
    const seasonEndDateRef = ref(null)
    const closeDialog = ref(false)


    function onSubmit () {
      if (seasonNameRef.value.validate() && seasonStartDateRef.value.validate() && seasonEndDateRef.value.validate()){
        postSeason(season.value)
        closeDialog.value = true
      }
    }

    return {
      season,
      closeDialog,
      seasonNameRef,
      seasonStartDateRef,
      seasonEndDateRef,
      onSubmit,
      seasonNameRules: [
        val => (val && val.length > 0) || 'Please type something'
      ],
      startDateRules: [
        val => (val && val.length > 0) || 'Please Select a Date'
      ],
      endDateRules: [
        val => (val && val.length > 0) || 'Please Select a Date'
      ],
    }
  }
}
</script>
