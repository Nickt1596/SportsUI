<template>
  <q-tab-panel :name="name">
    <q-card>
      <q-table
        v-if="people.length > 0"
        title="People"
        :rows="people"
        :columns="columns"
        row-key="id"
        selection="multiple"
        v-model:selected="selectedRows"
        :filter="filter"
        :hide-pagination="true"
        :rows-per-page-options="[0]"
        :loading="loading"
      >
        <template v-slot:top>
          <q-input
            rounded
            outlined
            dense
            debounce="300"
            label="Filter People"
            color="primary"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-space />
          <q-btn
            color="grey-3"
            text-color="black"
            :disable="loading"
            label="Add Person"
            @click="addPerson"
          />
          <q-btn
            class="q-ml-sm"
            color="grey-3"
            text-color="black"
            icon="more_horiz"
            :disable="loading"
            @click="removeRow"
          />
        </template>

        <template v-slot:body-cell-hasAccount="props">
          <q-td :props="props">
            <div v-if="props.value === true">
              <q-icon name="check_circle" color="green" size="24px" />
            </div>
            <div v-else>Pending</div>
          </q-td>
        </template>

        <template v-slot:body-cell-staff="props">
          <q-td :props="props">
            <div v-if="props.value === true">
              <q-icon name="check_circle" color="green" size="24px" />
            </div>
          </q-td>
        </template>

        <template v-slot:header-cell-hasAccount="props">
          <q-th :props="props">
            {{ props.col.label }}
            <q-icon name="info" size="20px" color="blue">
              <q-tooltip anchor="top middle" self="bottom middle">
                If user is pending, they have not yet accepted their account
                creation invitation.
              </q-tooltip>
            </q-icon>
          </q-th>
        </template>
      </q-table>
    </q-card>
  </q-tab-panel>
  <AddPersonDialog v-model="openDialog" @on-submit="onSubmit"/>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import AddPersonDialog from "components/OrganizationPortal/Individuals/AddPersonDialog.vue";
import { useOrganizationStore } from "stores/organization";
import { useAlertStore } from "stores/alert";

const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.full_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "hasAccount",
    align: "left",
    label: "Has Account",
    field: (row) => row.has_account,
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "phoneNumber",
    align: "left",
    label: "Phone",
    field: (row) => row.phone_number,
    sortable: true,
  },
];

export default {
  name: "PeoplePanel",
  components: { AddPersonDialog },
  props: {
    name: String,
    people: [],
  },
  setup() {
    const filter = ref("");
    const selectedRows = ref([]);
    const $q = useQuasar()
    const openDialog = ref(false);

    function addPerson () {
      openDialog.value = true
    }

    async function onSubmit (values) {
      $q.loading.show()
      Object.keys(values).forEach(function (key) {
        if (values[key] === undefined) {
          values[key] = "";
        }
      });
      const organizationStore = useOrganizationStore();
      const alertStore = useAlertStore();
      const { addPerson } = organizationStore;
      await addPerson(values);
      const { alert, clear } = alertStore;
      if (alert !== null) {
        if (alert.type === 'positive') {
          openDialog.value = false;
        }
        $q.notify(alert);
        clear();
      }
      $q.loading.hide()
    }

    return {
      columns,
      filter,
      selectedRows,
      addPerson,
      openDialog,
      onSubmit,
    };
  },
};
</script>
