import { defineStore } from 'pinia'
import { fetchWrapper } from "src/helpers/fetch-wrapper";
import { useUsersStore } from "stores/users";
import { storeToRefs } from "pinia/dist/pinia";
import { useAlertStore } from "stores/alert";

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    currentOrganization: {},
    people: {},
    organizationStaff: {},
    leagueStaff: {},
    addedPerson: {},
    addedOrgStaff: {},
    addedLeagueStaff: {},
    inviteDetails: {},
    inviteUserProfile: {},
  }),
  actions: {
    async setOrganization (organization) {
      this.currentOrganization = organization;
      await this.getPeople();
      await this.getOrganizationStaff();
      await this.getLeagueStaff();
    },
    async getPeople(){
      try {
        this.people = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/directory/users/organization/${this.currentOrganization.id}/people`);
      } catch (error) {
        this.people = { error };
      }
    },
    async getOrganizationStaff(){
      try {
        this.organizationStaff = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/directory/users/organization/${this.currentOrganization.id}/organization-staff/`);
      } catch (error) {
        this.organizationStaff = { error };
      }
    },
    async getLeagueStaff(){
      try {
        this.leagueStaff = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/directory/users/organization/${this.currentOrganization.id}/league-staff/`);
      } catch (error) {
        this.leagueStaff = { error };
      }
    },
    async addPerson(values){
      values.organization_id = this.currentOrganization.id
      values.country = ''
      const alertStore = useAlertStore();
      try {
        this.addedPerson = await fetchWrapper.post(`http://127.0.0.1:8000/api/v2/directory/add-person/`, values);
        await this.getPeople()
        const { success } = alertStore;
        success("Person Added successfully");
      } catch (e) {
        const { error } = alertStore;
        error(e);
      }
    },
    async addOrganizationStaff(values){
      values.organization_id = this.currentOrganization.id
      values.country = ''
      const alertStore = useAlertStore();
      try {
        this.addedOrgStaff = await fetchWrapper.post(`http://127.0.0.1:8000/api/v2/directory/add-organization-staff/`, values);
        await this.getOrganizationStaff()
        const { success } = alertStore;
        success("Person Added successfully");
      } catch (e) {
        const { error } = alertStore;
        error(e);
      }
    },
    async addLeagueStaff(values){
      values.country = ''
      const alertStore = useAlertStore();
      try {
        this.addedLeagueStaff = await fetchWrapper.post(`http://127.0.0.1:8000/api/v2/directory/add-league-staff/`, values);
        await this.getLeagueStaff()
        const { success } = alertStore;
        success("Person Added successfully");
      } catch (e) {
        const { error } = alertStore;
        error(e);
      }
    },
    async getInviteDetails(id, type){
      try{
        if (type === 'member'){
          this.inviteDetails = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/directory/organization-member-invite/${id}/`);
          this.inviteUserProfile =  this.inviteDetails.organization_member.user_profile
        }
        else if (type === 'org_staff'){
          this.inviteDetails = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/directory/organization-staff-invite/${id}/`);
          this.inviteUserProfile =  this.inviteDetails.organization_staff.user_profile
        }
        else{
          this.inviteDetails = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/directory/league-staff-invite/${id}/`)
          this.inviteUserProfile =  this.inviteDetails.league_staff.user_profile
        }
      } catch (error){
        this.inviteDetails = { error };
      }
    },
    // async getOrganizationMembers(){
    //   try {
    //     this.organizationMembers = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/directory/users/organization/${this.currentOrganization.id}/`);
    //   } catch (error) {
    //     this.organizationMembers = { error };
    //   }
    // },
    // async addStaff (invite) {
    //   try{
    //     const usersStore = useUsersStore();
    //     const { createUserProfile } = usersStore;
    //     await createUserProfile(invite)
    //   } catch (error) {
    //     this.inviteStaff = { error };
    //   }
    // },
    // async addOrgStaff (userProfileId) {
    //   try {
    //     const staffOrgParams = {
    //       organization: this.currentOrganization.id,
    //       user_profile: userProfileId
    //     }
    //     this.staffOrg = await fetchWrapper.post('http://127.0.0.1:8000/api/v2/organization-staff/', staffOrgParams);
    //     await this.sendInvite(this.staffOrg.id)
    //   } catch (error) {
    //     this.staffOrg = { error };
    //   }
    // },
    // async sendInvite (staffOrgId){
    //   try {
    //     const params = {
    //       staff_organization: staffOrgId,
    //       is_staff: true
    //     }
    //     this.inviteStaff = await fetchWrapper.post('http://127.0.0.1:8000/api/v2/organization-staff-invite/', params);
    //   } catch (error) {
    //     this.inviteStaff = { error };
    //   }
    // },
    // async getInvite (id){
    //   try{
    //     this.inviteStaff = await fetchWrapper.get(`http://127.0.0.1:8000/api/v2/organization-staff-invite/${id}/`);
    //   } catch (error) {
    //     this.inviteStaff = { error };
    //   }
    // }
  }
})
