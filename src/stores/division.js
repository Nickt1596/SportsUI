import { defineStore } from 'pinia'
import axios from "axios";
import { useSeasonStore } from "stores/season";
import { storeToRefs } from "pinia/dist/pinia";

export const useDivisionStore = defineStore('division', {
  state: () => ({
    seasonId: null,

    divisionsInSeason: [],
    divisionsNotInSeason: [],
    seasonDivisionsInSeason: []

  }),
  getters: {
  },
  actions: {
    getSeasonId () {
      const seasonStore = useSeasonStore()
      const {season} = storeToRefs(seasonStore)
      this.seasonId = season.value.id
    },
    addDivisions (divisionList) {
      this.getSeasonId()
      for (let i = 0; i < divisionList.length; i++){
        this.postDivision(divisionList[i])
      }
    },
    addImportDivisions (divisionList){
      this.getSeasonId()
      for (let i = 0; i < divisionList.length; i++) {
        const seasonDivision = {
          season: this.seasonId,
          division: divisionList[i]
        }
        axios.post(`http://127.0.0.1:8000/api/v1/seasondivision/`, seasonDivision).then(r => {})
      }
    },
    postDivision (division) {
      axios.post(`http://127.0.0.1:8000/api/v1/divisions/`, division)
        .then(response => {
          const seasonDivision = {
            season: this.seasonId,
            division: response.data.id
          }
          axios.post(`http://127.0.0.1:8000/api/v1/seasondivision/`, seasonDivision).then(r => {})
        })
    },
    getDivisionsInSeason () {
      this.getSeasonId()
      axios.get(`http://127.0.0.1:8000/api/v1/divisions/?season_id=` + this.seasonId + '&in_season=true')
        .then(response => {
          this.divisionsInSeason = response.data
        })
    },
    getSeasonDivisionsInSeason () {
      this.getSeasonId()
      axios.get(`http://127.0.0.1:8000/api/v1/seasondivision/?season_id=` + this.seasonId)
        .then(response => {
          this.seasonDivisionsInSeason = response.data
        })
    },
    getDivisionsNotInSeason () {
      this.getSeasonId()
      axios.get(`http://127.0.0.1:8000/api/v1/divisions/?season_id=` + this.seasonId)
        .then(response => {
          this.divisionsNotInSeason = response.data
        })
    },
  }
})
