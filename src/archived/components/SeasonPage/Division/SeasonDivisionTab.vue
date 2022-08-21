<template>
  <div class="q-pa-md q-gutter-y-lg row justify-center">
    <q-card class="col-12">
      <SeasonDivisionTabTable />
    </q-card>
  </div>
</template>

<script>
import SeasonDivisionTabTable from "src/archived/components/SeasonPage/Division/SeasonDivisionTabTable.vue";
export default {
  name: 'SeasonDivisionTab',
  components: { SeasonDivisionTabTable },
  setup () {
    return {}
  }
}
</script>
