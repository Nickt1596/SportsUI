<template>
  <q-tabs
    v-model="selectedTab"
    dense
    align="left"
    narrow-indicator
  >
    <q-tab name="seasons" label="Seasons"></q-tab>
  </q-tabs>
  <q-separator />
  <q-tab-panels v-model="selectedTab" animated class="bg-grey-2">
    <q-tab-panel name="seasons">
      <SeasonManagementSeasonsTab />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { ref } from "vue";
import SeasonManagementSeasonsTab from "components/../../archived/components/SeasonManagement/Season/SeasonManagementSeasonsTab.vue";

export default {
  name: 'SeasonManagementTabs',
  components: { SeasonManagementSeasonsTab },
  setup () {
    const selectedTab = ref('seasons')

    return {
      selectedTab,
    }
  }
}
</script>
