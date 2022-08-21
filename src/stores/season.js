import { defineStore } from 'pinia'
import axios from "axios";

export const useSeasonStore = defineStore('season', {
  state: () => ({
    seasons: [],
    season: null,
    getSeasonComplete: false,
    postSeasonResponse: null,
    putSeasonResponse: null,

    divisionsInSeason: [],
    divisionsNotInSeason: [],
  }),

  getters: {
    // doubleCount (state) {
    //   return state.counter * 2
    // }
  },

  actions: {
    getSeasons () {
      axios.get(`http://127.0.0.1:8000/api/v1/seasons`)
        .then(response => {
          this.seasons = response.data
        })
    },
    getSeason (id) {
      axios.get(`http://127.0.0.1:8000/api/v1/season/${id}`)
        .then(response => {
          this.season = response.data
          this.getSeasonComplete = true
        })
    },
    postSeason (season) {
      axios.post(`http://127.0.0.1:8000/api/v1/seasons`, season)
        .then(response => {
          this.postSeasonResponse = response.data
          this.getSeasons()
        })
    },
    putSeason (id, season) {
      axios.patch(`http://127.0.0.1:8000/api/v1/season/${id}/`, season)
        .then(response => {
          this.putSeasonResponse = response.data
          this.getSeasons()
        })
    },

  }
})
