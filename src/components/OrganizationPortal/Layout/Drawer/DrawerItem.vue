<template>
  <q-item
    :to="route"
    class="text-grey-4"
    clickable
    v-ripple
    dark
    active-class="bg-grey-8"
  >
    <q-item-section>{{ name }}</q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "DrawerItem",
  props: {
    route: {},
    name: String,
  },
  setup() {
    return {};
  },
};
</script>
