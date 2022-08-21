import { defineStore } from 'pinia'
import { fetchWrapper } from "src/helpers/fetch-wrapper";
import { useUsersStore } from "stores/users";
import { storeToRefs } from "pinia/dist/pinia";

export const useLeagueStore = defineStore('league', {
  state: () => ({
    organization: {},
    league: {},
    leagueStaff: {},
    activeUser: null
  }),
  actions: {
    async leagueCreation(values) {
      await this.getActiveUser();
      const organizationParams = {
        admin: this.activeUser.id,
        name: values.name
      }
      await this.createOrganization(organizationParams);
      await this.createLeague(values);
      await this.createLeagueStaff();
    },
    async createOrganization(params) {
      try {
        this.organization = await fetchWrapper.post('http://127.0.0.1:8000/api/v2/organizations/', params);
      } catch (error) {
        this.site = { error };
      }
    },
    async createLeague(params) {
      params.organization = this.organization.id;
      params.commissioner = this.activeUser.id
      try {
        this.league = await fetchWrapper.post('http://127.0.0.1:8000/api/v2/leagues/', params);
      } catch (error) {
        this.league = { error };
      }
    },
    async createLeagueStaff() {
      const params = {
        user: this.activeUser.id,
        league: this.league.id
      }
      try {
        this.leagueStaff = await fetchWrapper.post('http://127.0.0.1:8000/api/v2/league-staff/', params);
      } catch (error) {
        this.leagueStaff = { error };
      }
    },
    async getActiveUser(){
      const usersStore = useUsersStore();
      const { activeUser } = storeToRefs(usersStore)
      this.activeUser = activeUser;
    },
  }
})
