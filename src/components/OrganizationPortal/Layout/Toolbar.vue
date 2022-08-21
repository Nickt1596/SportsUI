<template>
  <q-toolbar>
    <ToolbarTitle />
    <q-space />
    <div class="q-gutter-sm row items-center no-wrap">
      <OrganizationSelect
        @set-organization="setOrganization"
        :organizations="organizations"
        :current-organization="currentOrganization"
        v-if="organizations.length > 0"
      />
      <ToolbarMessenger />
      <ToolbarInbox />
      <ToolbarProfile
        @logout="logout"
        :active-user="activeUser"
        :initials="getInitials()"
        v-if="activeUser"
      />
    </div>
  </q-toolbar>
</template>

<script>
import { useAuthStore } from "stores/auth";
import { useUsersStore } from "stores/users";
import { storeToRefs } from "pinia/dist/pinia";
import { useStaffStore } from "stores/staff";
import { useOrganizationStore } from "stores/organization";
import ToolbarTitle from "components/OrganizationPortal/Layout/Toolbar/ToolbarTitle.vue";
import ToolbarMessenger from "components/OrganizationPortal/Layout/Toolbar/ToolbarMessenger.vue";
import ToolbarInbox from "components/OrganizationPortal/Layout/Toolbar/ToolbarInbox.vue";
import OrganizationSelect from "components/OrganizationPortal/Layout/Toolbar/OrganizationSelect.vue";
import ToolbarProfile from "components/OrganizationPortal/Layout/Toolbar/ToolbarProfile.vue";

export default {
  name: "OrganizationToolbar",
  components: {
    ToolbarProfile,
    OrganizationSelect,
    ToolbarInbox,
    ToolbarMessenger,
    ToolbarTitle,
  },
  setup() {
    const authStore = useAuthStore();
    const { logout } = authStore;

    const usersStore = useUsersStore();
    const { getActiveUser } = usersStore;
    getActiveUser();
    const { activeUser } = storeToRefs(usersStore);

    const staffStore = useStaffStore();
    const { organizations, leagues } = storeToRefs(staffStore);
    const organizationStore = useOrganizationStore();
    const { currentOrganization } = storeToRefs(organizationStore);
    const { setOrganization } = useOrganizationStore();

    const getInitials = () => {
      if ("user_profile" in activeUser.value) {
        return activeUser.value.user_profile.first_name[0] + activeUser.value.user_profile.last_name[0];
      }
    };

    return {
      logout,
      activeUser,
      organizations,
      leagues,
      currentOrganization,
      setOrganization,
      getInitials,
    };
  },
};
</script>
