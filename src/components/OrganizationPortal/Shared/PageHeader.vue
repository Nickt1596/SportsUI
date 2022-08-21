<template>
  <q-card-section class="q-pl-lg">
    <div class="text-h6">{{ title }}</div>
  </q-card-section>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: String,
  },
  setup () {
    return {

    }
  }
}
</script>
