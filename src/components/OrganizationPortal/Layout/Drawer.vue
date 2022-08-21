<template>
  <q-drawer
    v-model="checkSeasonRoute"
    side="left"
    bordered
    class="bg-grey-9"
    :width="250"
    elevated
  >
    <q-scroll-area class="fit">
      <q-list>
        <DrawerHeader
          :organization-name="currentOrganization.name"
          v-if="organizations.length > 0"
        />
        <DrawerItem :route="{ name: 'OrganizationHome' }" name="Home" />
        <DrawerItem :route="{ name: 'OrganizationMembers' }" name="Members" />
        <DrawerItemExpansion
          main-label="Leagues"
          :items="currentOrganization.leagues"
        />
        <DrawerItem
          :route="{ name: 'OrganizationFinancials' }"
          name="Financials"
        />
        <DrawerItem
          :route="{ name: 'OrganizationRegistration' }"
          name="Registration"
        />
        <DrawerItem
          :route="{ name: 'OrganizationCompetition' }"
          name="Competition"
        />
        <DrawerItem
          :route="{ name: 'OrganizationPromotion' }"
          name="Promotion"
        />
        <DrawerItem :route="{ name: 'OrganizationWebsite' }" name="Website" />
        <DrawerItem :route="{ name: 'OrganizationSafety' }" name="Safety" />
        <DrawerItem :route="{ name: 'OrganizationSettings' }" name="Settings" />
        <DrawerItem
          :route="{ name: 'season-management' }"
          name="Season Management"
        />
        <DrawerItem
          :route="{ name: 'PublicHome' }"
          name="Go To Sports Management"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { useRoute } from "vue-router/dist/vue-router";
import { computed } from "vue";
import { useStaffStore } from "stores/staff";
import { storeToRefs } from "pinia/dist/pinia";
import { useOrganizationStore } from "stores/organization";
import DrawerHeader from "components/OrganizationPortal/Layout/Drawer/DrawerHeader.vue";
import DrawerItem from "components/OrganizationPortal/Layout/Drawer/DrawerItem.vue";
import DrawerItemExpansion from "components/OrganizationPortal/Layout/Drawer/DrawerItemExpansion.vue";

export default {
  name: "OrganizationDrawer",
  components: { DrawerItemExpansion, DrawerItem, DrawerHeader },
  setup() {
    const route = useRoute();
    const checkSeasonRoute = computed(() => {
      return !(route.name === "season");
    });

    const organizationStore = useOrganizationStore();
    const { currentOrganization } = storeToRefs(organizationStore);
    const staffStore = useStaffStore();
    const { organizations, leagues } = storeToRefs(staffStore);

    return {
      checkSeasonRoute,
      organizations,
      leagues,
      currentOrganization,
    };
  },
};
</script>
