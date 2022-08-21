import { defineStore } from 'pinia'
import { useSeasonStore } from "stores/season";
import { storeToRefs } from "pinia/dist/pinia";
import axios from "axios";

export const usePlayerStore = defineStore('player', {
  state: () => ({
    seasonId: null,
    playersInSeason: [],
    playersNotInSeason: []
  }),

  getters: {
  },

  actions: {
    getSeasonId () {
      const seasonStore = useSeasonStore()
      const {season} = storeToRefs(seasonStore)
      this.seasonId = season.value.id
    },
    getPlayersInSeason () {
      this.getSeasonId()
      axios.get(`http://127.0.0.1:8000/api/v1/seasondivisionteamplayer/?season_id=` + this.seasonId )
        .then(response => {
          this.playersInSeason = response.data
        })
    },
  }
})
