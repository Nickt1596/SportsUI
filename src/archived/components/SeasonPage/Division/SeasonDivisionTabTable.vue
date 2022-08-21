<template>
  <q-table
    title="Divisions"
    :rows="divisionsInSeason"
    :columns="divisionColumns"
    row-key="id"
  >
    <template v-slot:top>
      <p class="text-h6 text-center">Divisions</p>
      <q-space />
      <q-btn class="q-mr-md" color="primary" label="Save All Changes" />
      <q-btn
        class="q-mr-md"
        color="primary"
        label="Import Divisions"
        @click="importDivisions"
      />
      <q-btn color="primary" label="Add New Divisions" @click="addDivision" />
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="bg-grey-4"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn class="q-ml-sm" icon="delete" size="md" flat />
      </q-td>
    </template>
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <q-btn class="q-ml-sm" icon="edit" size="sm" flat />{{ props.value }}
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { storeToRefs } from "pinia/dist/pinia";
import { useQuasar } from "quasar";
import AddDivisionDialog from "src/archived/components/SeasonPage/Division/AddDivisionDialog.vue";
import ImportDivisionDialog from "src/archived/components/SeasonPage/Division/ImportDivisionDialog.vue";
import { useDivisionStore } from "stores/division";

const divisionColumns = [
  {
    name: "name",
    required: true,
    label: "Division Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "gender",
    align: "left",
    label: "Gender",
    field: "gender",
    sortable: true,
  },
  {
    name: "teams",
    align: "left",
    label: "Teams",
    field: "teams",
    sortable: true,
  },
  { name: "actions", align: "right", label: "Actions", field: "actions" },
];

export default {
  name: "SeasonDivisionTabTable",
  setup() {
    const divisionStore = useDivisionStore();
    const { divisionsInSeason } = storeToRefs(divisionStore);
    const { getDivisionsInSeason } = divisionStore;
    getDivisionsInSeason();

    const $q = useQuasar();

    function addDivision() {
      $q.dialog({
        component: AddDivisionDialog,
      });
    }

    function importDivisions() {
      $q.dialog({
        component: ImportDivisionDialog,
      });
    }

    return {
      divisionColumns,
      divisionsInSeason,
      addDivision,
      importDivisions,
    };
  },
};
</script>
