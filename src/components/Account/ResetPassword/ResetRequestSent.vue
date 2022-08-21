<template>
  <q-card-section>
    <p class="text-left text-bold">
      A password reset link has been sent to: {{ requestEmail }}
    </p>
  </q-card-section>
</template>

<script>
export default {
  name: "ResetRequestSent",
  props: {
    requestEmail: String,
  },
  setup() {
    return {};
  },
};
</script>
