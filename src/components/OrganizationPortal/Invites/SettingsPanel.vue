<template>
  <q-tab-panel :name="name">
    <q-card>
    </q-card>
  </q-tab-panel>
</template>

<script>
export default {
  name: 'SettingsPanel',
  props: {
    name: String,
  },
  setup () {
    return {

    }
  }
}
</script>
