<template>
  <q-btn-dropdown
    stretch
    flat
    label="Organizations"
    v-if="organizations.length > 0"
  >
    <q-list>
      <q-item
        clickable
        v-close-popup
        v-for="organization in organizations"
        :key="organization.id"
        :active="currentOrganization.id === organization.id"
        active-class="bg-grey-4 text-black"
      >
        <q-item-section @click="setOrganization(organization)">
          <q-item-label>{{ organization.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: "OrganizationSelect",
  props: {
    organizations: [],
    currentOrganization: {},
  },
  setup(props, context) {
    const setOrganization = (event) => {
      context.emit("setOrganization", event);
    };
    return {
      setOrganization,
    };
  },
};
</script>
