<template>
  <div class="col-10">
    <q-card>

      <q-card-section>
        <div class="text-h6">{{seasonName}}</div>
        <div v-if="startDate" class="text-subtitle2">{{startDate}} - {{endDate}}</div>
        <q-separator></q-separator>
      </q-card-section>

      <q-card-actions align="left">
        <q-btn flat :to="{ name: 'season', params: {id: seasonId, tab:'overview'} }">Overview</q-btn>
        <q-btn flat :to="{ name: 'season', params: {id: seasonId, tab:'divisions'} }">Divisions</q-btn>
        <q-btn flat :to="{ name: 'season', params: {id: seasonId, tab:'teams'} }">Teams</q-btn>
        <q-btn flat :to="{ name: 'season', params: {id: seasonId, tab:'players'} }">Players</q-btn>
        <q-btn flat :to="{ name: 'season', params: {id: seasonId, tab:'schedule'} }">Schedule</q-btn>
      </q-card-actions>

    </q-card>
  </div>
</template>

<script>

export default {
  name: 'SeasonCard',
  props:{
    seasonName: String,
    startDate: String,
    endDate: String,
    seasonId: String
  },
  setup () {
    return {
    }
  }
}
</script>
