<template>
  <div class="q-pa-md q-gutter-y-lg row justify-center">
    <q-card class="col-12">
      <SeasonTeamTabTable />
    </q-card>
  </div>
</template>

<script>
import SeasonTeamTabTable from "src/archived/components/SeasonPage/Team/SeasonTeamTabTable.vue";
export default {
  name: 'SeasonTeamTab',
  components: { SeasonTeamTabTable },
  setup () {
    return {}
  }
}
</script>
