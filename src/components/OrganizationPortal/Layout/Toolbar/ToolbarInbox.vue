<template>
  <q-btn round dense flat color="text-grey-7" icon="mail" to="inbox" class="q-mr-sm">
    <q-badge color="red" text-color="white" floating>
      2
    </q-badge>
    <q-tooltip>Inbox</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: 'ToolbarInbox',
  setup () {
    return {}
  }
}
</script>
