<template>
  <q-item header style="height: 175px" class="bg-grey-10">
    <q-item-section class="flex-center">
      <q-avatar
        size="100px"
        font-size="52px"
        color="white"
        icon="sports_hockey"
        class="q-mb-lg"
      />
      <div class="text-bold text-white">
        {{ organizationName }}
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "DrawerHeader",
  props: {
    organizationName: String,
  },
  setup() {
    return {};
  },
};
</script>
