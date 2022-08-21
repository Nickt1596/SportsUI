import { defineStore } from 'pinia'
import { fetchWrapper } from "src/helpers/fetch-wrapper.js";
import { useOrganizationStore } from "stores/organization";

export const useStaffStore = defineStore('staff', {
  state: () => ({
    organizations: {},
    leagues: {},
  }),

  actions: {
    async getOrganizations (userId) {
      try {
        this.organizations = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/organizations/user/${userId}/`);
        if (this.organizations.length > 0){
          const organizationStore = useOrganizationStore();
          const { setOrganization } = organizationStore;
          await setOrganization(this.organizations[0])
          console.log('There are organizations')
        }
      } catch (error) {
        this.organizations = { error };
      }
    },
    async getLeagues(userId) {
      try {
        this.leagues = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/leagues/user/${userId}/`);
      } catch (error) {
        this.leagues = { error };
      }
    },
  }
})
