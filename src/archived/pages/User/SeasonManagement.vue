<template>
  <q-page>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">Season Management</div>
      </q-card-section>
      <SeasonManagementTabs />
    </q-card>
  </q-page>
</template>

<script>
import SeasonManagementTabs from "src/archived/components/SeasonManagement/SeasonManagementTabs.vue";

export default {
  components: { SeasonManagementTabs },
  name: 'SeasonManagement',
  setup () {
    return {
    }
  }
}
</script>
