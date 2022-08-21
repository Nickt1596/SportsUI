<template>
  <div class="q-pa-md q-gutter-y-lg row justify-center">
    <q-card class="col-12">
      <SeasonPlayerTabTable />
    </q-card>
  </div>
</template>

<script>
import SeasonPlayerTabTable from "src/archived/components/SeasonPage/Player/SeasonPlayerTabTable.vue";
export default {
  name: 'SeasonPlayerTab',
  components: { SeasonPlayerTabTable },
  setup () {
    return {

    }
  }
}
</script>
