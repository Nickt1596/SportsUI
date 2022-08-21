<template>
  <q-page class="flex flex-center bg-grey-3" padding>
    <div class="full-width full-height" style="max-width: 400px">
      <q-card square bordered class="q-pa-lg" v-if="finished">
        <FormHeader />
        <VerificationSuccess />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useRoute } from "vue-router/dist/vue-router";
import { onMounted, ref } from "vue";
import { useUsersStore } from "stores/users";
import FormHeader from "components/Account/Shared/FormHeader.vue";
import VerificationSuccess from "components/Account/Verify/VerificationSuccess.vue";

export default {
  name: "VerifyPage",
  components: { VerificationSuccess, FormHeader },
  setup() {
    const finished = ref(false);

    onMounted(async () => {
      const route = useRoute();
      const verifyKey = route.params.key;
      const usersStore = useUsersStore();
      const { verifyEmail } = usersStore;
      try {
        await verifyEmail({ key: verifyKey });
        finished.value = true;
      } catch (e) {
        error(e);
      }
    });

    return {
      finished,
    };
  },
};
</script>
