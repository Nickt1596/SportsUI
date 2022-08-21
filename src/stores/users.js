import { defineStore } from 'pinia'
import { fetchWrapper } from "src/helpers/fetch-wrapper.js";
import { useStaffStore } from "stores/staff";
import { useOrganizationStore } from "stores/organization";

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: {},
    activeUser: {},
    userProfile: {},
    registerStatus: {}
  }),
  actions: {
    async register(user) {
      try{
        console.log(user)
        this.registerStatus = await fetchWrapper.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/`, user);
      } catch (error) {
        this.registerStatus = { error };
      }
    },
    async getAll() {
      this.users = { loading: true };
      try {
        this.users = await fetchWrapper.get(`http://127.0.0.1:8000/api/v1/dj-rest-auth/users/`);
      } catch (error) {
        this.users = { error };
      }
    },
    async getActiveUser() {
      // this.activeUser = { loading: true };
      try {
        this.activeUser = await fetchWrapper.get(`http://127.0.0.1:8000/api/v1/dj-rest-auth/user/`)
        if(this.activeUser.user_profile.is_staff){
          const staffStore = useStaffStore();
          const { getOrganizations, getLeagues } = staffStore;
          await getOrganizations(this.activeUser.id)
          await getLeagues(this.activeUser.id)
        }
      } catch (error) {
        this.activeUser = { error };
      }
    },
    async resendEmail(email) {
      try {
        await fetchWrapper.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/resend-email/`, email)
      } catch (error) {
        console.log('resendEmail: ', error);
      }
    },
    async verifyEmail(key) {
      try {
        await fetchWrapper.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/verify-email/`, key)
      } catch (error) {
        console.log(error);
      }
    },
    async resetPasswordRequest(email) {
      try {
        await fetchWrapper.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/password/reset/`, email)
      } catch (error) {
        console.log(error);
      }
    },
    async resetPasswordConfirm(values) {
      try {
        await fetchWrapper.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/password/reset/confirm/`, values)
      } catch (error) {
        console.log(error);
      }
    },
    async createUserProfile(values) {
      try {
        this.userProfile = await fetchWrapper.post(`http://127.0.0.1:8000/api/v1/dj-rest-auth/userprofiles/`, values)
        const organizationStore = useOrganizationStore();
        const { addOrgStaff } = organizationStore;
        addOrgStaff(this.userProfile.id)
      } catch (error) {
        console.log(error);
      }
    },
  }
})
