<template>
  <q-card-section>
    <p class="text-left text-bold">
      Password has been changed successfully. Please log in.
    </p>
    <q-btn
      unelevated
      dense
      label="Login"
      class="full-width"
      color="primary"
      :to="{ name: 'AccountLogin' }"
    />
  </q-card-section>
</template>

<script>
export default {
  name: "ResetPasswordSuccess",
  setup() {
    return {};
  },
};
</script>
