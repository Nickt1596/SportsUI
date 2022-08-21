<template>
  <q-toolbar class="bg-grey-2 text-h3">
    <q-btn no-caps flat :to="{ name: 'season-management' }"
      >&#60; Seasons
    </q-btn>
  </q-toolbar>
</template>

<script>
export default {
  name: "SeasonToolbar",
  setup() {
    return {};
  },
};
</script>
