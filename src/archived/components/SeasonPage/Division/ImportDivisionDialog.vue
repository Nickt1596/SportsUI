<template>
  <q-dialog>
    <div class="full-width" style="max-width: 600px">
      <q-card>
        <q-card-section class="row items-center q-pb-md">
          <div class="text-h6">Import Divisions</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="q-pa-md">
            <div
              class="q-gutter-sm"
              v-for="div in divisionsNotInSeason"
              :key="div.id"
            >
              <q-checkbox
                v-model="importSelected"
                :val="div.id"
                :label="div.name"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Cancel" />
          <q-btn
            v-close-popup
            color="primary"
            type="submit"
            label="Import Divisions"
            @click="addImportDivisions(importSelected)"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { useDivisionStore } from "stores/division";
import { storeToRefs } from "pinia/dist/pinia";
import { ref } from "vue";

export default {
  name: "ImportDivisionDialog",
  setup() {
    const divisionStore = useDivisionStore();
    const { divisionsNotInSeason } = storeToRefs(divisionStore);
    const { getDivisionsNotInSeason, addImportDivisions } = divisionStore;
    const importSelected = ref([]);
    getDivisionsNotInSeason();

    return {
      divisionsNotInSeason,
      importSelected,
      addImportDivisions,
    };
  },
};
</script>
