<template>
  <q-card-section>
    <p class="text-center text-bold">League Created Successfully!</p>
    <div class="row text-center">
      <div class="col">
        <q-btn
          unelevated
          dense
          label="Organization Portal"
          color="primary"
          :to="{ name: 'UserHome' }"
        />
      </div>
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: "CreateLeagueSuccess",
  setup() {
    return {};
  },
};
</script>
