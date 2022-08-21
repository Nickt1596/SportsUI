<template>
  <q-page>
    <q-card flat>
      <PageHeader title="Members" />
      <HeaderTabs @update-selected="updateSelected" />
      <q-separator />
    </q-card>
    <div class="q-pa-lg">
      <div class="q-gutter-y-lg">
        <div class="row justify-center">
          <div class="col">
            <q-tab-panels v-model="selected" animated class="bg-grey-3">
              <PeoplePanel :name="selected" :people="people" v-if="selected === 'people'" />
              <OrganizationStaffPanel :name="selected" :organization-staff="organizationStaff" v-if="selected === 'org_staff'" />
              <LeagueStaffPanel :name="selected" :league-staff="leagueStaff" v-if="selected === 'league_staff'" />
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useOrganizationStore } from "stores/organization";
import { storeToRefs } from "pinia/dist/pinia";
import PageHeader from "components/OrganizationPortal/Shared/PageHeader.vue";
import HeaderTabs from "components/OrganizationPortal/Members/HeaderTabs.vue";
import OrganizationStaffPanel from "components/OrganizationPortal/Members/OrganizationStaffPanel.vue";
import PeoplePanel from "components/OrganizationPortal/Members/PeoplePanel.vue";
import LeagueStaffPanel from "components/OrganizationPortal/Members/LeagueStaffPanel.vue";

export default {
  name: "OrganizationMembers",
  components: { LeagueStaffPanel, PeoplePanel, OrganizationStaffPanel, HeaderTabs, PageHeader },
  setup() {
    const selected = ref("people");
    const organizationStore = useOrganizationStore();
    const { people, organizationStaff, leagueStaff } = storeToRefs(organizationStore);

    const updateSelected = (value) => {
      selected.value=value;
    }
    return {
      selected,
      people,
      organizationStaff,
      leagueStaff,
      updateSelected
    };
  },
};
</script>
