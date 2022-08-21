<template>
  <q-card flat v-if="getSeasonComplete">
    <SeasonToolbar />
    <q-separator />
    <q-card-section>
      <div class="text-h6">{{ season.name }}</div>
      <div v-if="season.startDate" class="text-subtitle2">
        {{ season.startDate }} - {{ season.endDate }}
      </div>
    </q-card-section>
    <SeasonTabs />
  </q-card>
</template>

<script>
import { useRoute } from "vue-router/dist/vue-router";
import { useSeasonStore } from "stores/season";
import { storeToRefs } from "pinia/dist/pinia";
import SeasonToolbar from "src/archived/components/SeasonPage/SeasonToolbar.vue";
import SeasonTabs from "src/archived/components/SeasonPage/SeasonTabs.vue";

export default {
  name: "SeasonPage",
  components: { SeasonTabs, SeasonToolbar },
  setup() {
    const seasonStore = useSeasonStore();
    const { season, getSeasonComplete } = storeToRefs(seasonStore);
    const route = useRoute();
    seasonStore.getSeason(route.params.id);

    return {
      season,
      getSeasonComplete,
    };
  },
};
</script>
