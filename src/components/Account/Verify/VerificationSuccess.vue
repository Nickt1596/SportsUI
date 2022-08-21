<template>
  <q-card-section>
    <p class="text-center text-bold">Verified Successfully!</p>
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
  name: "VerificationSuccess",
  setup() {
    return {};
  },
};
</script>
