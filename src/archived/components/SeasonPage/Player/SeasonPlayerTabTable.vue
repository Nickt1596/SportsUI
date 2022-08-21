<template>
  <q-table title="Treats" :rows="playersInSeason" :columns="playerColumns" row-key="id">
    <template v-slot:top>
      <p class="text-h6">Players</p>
      <q-space />
      <q-input v-model="search" type="search"  outlined dense >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
<!--      <q-btn class="q-ml-sm" color="primary"  label="Import Teams" @click="importTeams"/>-->
<!--      <q-btn class="q-ml-sm" color="primary"  label="Add New Teams" @click="addTeam"/>-->
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
import { ref } from "vue";
import { useTeamStore } from "stores/team";
import { storeToRefs } from "pinia/dist/pinia";
import { usePlayerStore } from "stores/player";

const playerColumns = [
  { name: 'playerFirstName', required: true, label: 'First Name', align: 'left', field: row => row.playerFirstName, format: val => `${val}`, sortable: true },
  { name: 'playerLastName', align: 'left', label: 'Last Name', field: 'playerLastName', sortable: true },
  { name: 'jerseyNumber', align: 'left', label: '#', field: 'jerseyNumber', sortable: true },
  { name: 'position', align: 'left', label: 'Position', field: 'position', sortable: true },
  { name: 'teamName', align: 'left', label: 'Team', field: 'teamName' },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions' },
]
export default {
  name: 'SeasonPlayerTabTable',
  setup () {
    const playerStore = usePlayerStore()
    const {playersInSeason} = storeToRefs(playerStore)
    const {getPlayersInSeason} = playerStore
    getPlayersInSeason()
    const search = ref('')
    return {
      search,
      playerColumns,
      playersInSeason
    }
  }
}
</script>
