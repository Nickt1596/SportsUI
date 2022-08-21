<template>
  <q-table title="Treats" :rows="teamsInSeason" :columns="teamColumns" row-key="id">
    <template v-slot:top>
      <p class="text-h6">Teams</p>
      <q-space />
      <q-input v-model="search" type="search"  outlined dense >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn class="q-ml-sm" color="primary"  label="Import Teams" @click="importTeams"/>
      <q-btn class="q-ml-sm" color="primary"  label="Add New Teams" @click="addTeam"/>
      <q-btn class="q-ml-sm" icon="more_vert" size="md" flat />
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props" class="bg-grey-4">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn class="q-ml-sm" icon="more_vert" size="md" flat />
      </q-td>
    </template>
<!--    <template v-slot:body-cell-name="props">-->
<!--      <q-td :props="props">-->
<!--        <router-link style="text-decoration: none; color: blue;" to="{ name: 'season' }">{{props.value}}</router-link>-->
<!--      </q-td>-->
<!--    </template>-->
  </q-table>
</template>

<script>

import { useTeamStore } from "stores/team";
import { storeToRefs } from "pinia/dist/pinia";
import { ref } from "vue";
import { useQuasar } from "quasar";
import ImportTeamDialog from "src/archived/components/SeasonPage/Team/ImportTeamDialog.vue";
import AddTeamDialog from "src/archived/components/SeasonPage/Team/AddTeamDialog.vue";

const teamColumns = [
  { name: 'name', required: true, label: 'Team Name', align: 'left', field: row => row.teamName, format: val => `${val}`, sortable: true },
  { name: 'division', align: 'left', label: 'Division', field: 'divisionName', sortable: true },
  { name: 'players', align: 'left', label: 'Players', field: 'players', sortable: true },
  { name: 'staff', align: 'left', label: 'Staff', field: 'staff', sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions' },
]

export default {
  name: 'SeasonTeamTabTable',
  setup () {
    const teamStore = useTeamStore()
    const {teamsInSeason} = storeToRefs(teamStore)
    const {getTeamsInSeason} = teamStore
    getTeamsInSeason()

    const search = ref('')

    const $q = useQuasar()

    function addTeam () {
      console.log('Hit')
      $q.dialog({
        component: AddTeamDialog
      })
    }

    function importTeams () {
      $q.dialog({
        component: ImportTeamDialog
      })
    }

    return {
      teamColumns,
      teamsInSeason,
      search,
      addTeam,
      importTeams
    }
  }
}
</script>
