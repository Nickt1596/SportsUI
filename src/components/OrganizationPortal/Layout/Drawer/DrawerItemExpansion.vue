<template>
  <q-expansion-item
    :label="mainLabel"
    class="text-grey-4"
    clickable
    dark
    active-class="bg-grey-8"
    :content-inset-level="0.25"
  >
    <q-item
      class="text-grey-4"
      clickable
      dark
      active-class="bg-grey-8"
      v-for="item in items"
      :key="item.id"
      :to=getRoute(item)
    >
      <q-item-section>{{ item.name }}</q-item-section>
    </q-item>
  </q-expansion-item>
</template>

<script>
export default {
  name: "DrawerItemExpansion",
  props: {
    mainLabel: String,
    items: [],
  },
  setup() {
    function getRoute (item) {
      if (item.route){
        return item.route;
      }
      else {
        return null
      }
    }
    return {
      getRoute
    };
  },
};
</script>
