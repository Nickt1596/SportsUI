<template>
  <q-tabs v-model="selectedTab" dense align="left" narrow-indicator @click="updateSelected">
    <q-tab name="people" label="People" class="q-pl-lg"></q-tab>
    <q-tab name="org_staff" label="Organization Staff" class="q-pl-lg"></q-tab>
    <q-tab name="league_staff" label="League Staff" class="q-pl-lg"></q-tab>
  </q-tabs>
</template>

<script>
import { ref } from "vue";

export default {
  name: 'HeaderTabs',
  setup (props, context) {
    const selectedTab = ref('people');
    const updateSelected = () => {
      context.emit("updateSelected", selectedTab.value);
    };
    return {
      selectedTab,
      updateSelected
    }
  }
}
</script>
