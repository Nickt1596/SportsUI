<template>
  <q-tabs v-model="selectedTab" dense align="left" narrow-indicator>
    <q-tab name="overview" label="Overview"></q-tab>
    <q-tab name="divisions" label="Divisions"></q-tab>
    <q-tab name="teams" label="Teams"></q-tab>
    <q-tab name="players" label="Players"></q-tab>
    <q-tab name="schedule" label="Schedule"></q-tab>
  </q-tabs>
  <q-separator />
  <q-tab-panels v-model="selectedTab" animated class="bg-grey-3">
    <q-tab-panel name="overview">
    </q-tab-panel>
    <q-tab-panel name="divisions">
      <SeasonDivisionTab />
    </q-tab-panel>
    <q-tab-panel name="teams">
      <SeasonTeamTab />
    </q-tab-panel>
    <q-tab-panel name="players">
      <SeasonPlayerTab />
    </q-tab-panel>
    <q-tab-panel name="schedule">
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router/dist/vue-router";
import SeasonDivisionTab from "components/../../archived/components/SeasonPage/Division/SeasonDivisionTab.vue";
import SeasonTeamTab from "components/../../archived/components/SeasonPage/Team/SeasonTeamTab.vue";
import SeasonPlayerTab from "components/../../archived/components/SeasonPage/Player/SeasonPlayerTab.vue";

export default {
  name: "SeasonTabs",
  components: { SeasonPlayerTab, SeasonTeamTab, SeasonDivisionTab },
  setup() {
    const route = useRoute();
    const selectedTab = ref(route.params.tab);
    return {
      selectedTab,
    };
  },
};
</script>
