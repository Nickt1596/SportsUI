import { defineStore } from 'pinia'
import { useSeasonStore } from "stores/season";
import { storeToRefs } from "pinia/dist/pinia";
import axios from "axios";

export const useTeamStore = defineStore('team', {
  state: () => ({
    seasonId: null,
    teamsInSeason: [],
    teamsNotInSeason: [],

  }),
  getters: {
  },
  actions: {
    getSeasonId () {
      const seasonStore = useSeasonStore()
      const {season} = storeToRefs(seasonStore)
      this.seasonId = season.value.id
    },
    addTeams (teamList) {
      this.getSeasonId()
      for (let i = 0; i < teamList.length; i++){
        this.postTeam(teamList[i])
      }
    },
    importTeams (teamImportList) {
      this.getSeasonId()
      for (let i = 0; i < teamImportList.length; i++){
        this.postImportTeam(teamImportList[i])
      }
    },
    postTeam (team) {
      axios.post(`http://127.0.0.1:8000/api/v1/teams/`, team)
        .then(response => {
          const seasonDivisionTeam = {
            season_division: team.division,
            team: response.data.id
          }
          axios.post(`http://127.0.0.1:8000/api/v1/seasondivisionteam/`, seasonDivisionTeam).then(r => {})
        })
    },
    postImportTeam (seasonDivisionTeam){
      axios.post(`http://127.0.0.1:8000/api/v1/seasondivisionteam/`, seasonDivisionTeam).then(r => {})
    },
    getTeamsInSeason () {
      this.getSeasonId()
      axios.get(`http://127.0.0.1:8000/api/v1/seasondivisionteam/?season_id=` + this.seasonId )
        .then(response => {
          this.teamsInSeason = response.data
        })
    },
    getTeamsNotInSeason () {
      this.getSeasonId()
      axios.get(`http://127.0.0.1:8000/api/v1/teams/?season_id=` + this.seasonId)
        .then(response => {
          this.teamsNotInSeason = response.data
        })
    },
  }
})
