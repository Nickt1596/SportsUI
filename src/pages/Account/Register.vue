<template>
  <q-page class="flex flex-center bg-grey-3" padding>
    <div class="full-width full-height" style="max-width: 400px">
      <q-card square bordered class="q-pa-lg">
        <FormHeader />
        <RegisterForm @on-submit="onSubmit" v-if="!registered" />
        <VerificationSent :verification-email="verificationEmail" v-else />
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { useUsersStore } from "stores/users";
import { useAlertStore } from "stores/alert";
import { ref } from "vue";
import VerificationSent from "components/Account/Verify/VerificationSent.vue";
import { useQuasar } from "quasar";
import FormHeader from "components/Account/Shared/FormHeader.vue";
import RegisterForm from "components/Account/Register/RegisterForm.vue";

export default {
  name: "RegisterPage",
  components: { RegisterForm, FormHeader, VerificationSent },
  setup() {
    const $q = useQuasar();
    const registered = ref(false);
    const verificationEmail = ref("");

    async function onSubmit(values) {
      const alertStore = useAlertStore();
      const usersStore = useUsersStore();
      const { register } = usersStore;
      const { success, error } = alertStore;
      try {
        await register(values);
        success("Registration successful");
        registered.value = true;
        verificationEmail.value = values.email;
      } catch (e) {
        error(e);
      }
      const { alert, clear } = alertStore;
      if (alert !== null) {
        $q.notify(alert);
        clear();
      }
    }

    return {
      registered,
      verificationEmail,
      onSubmit,
    };
  },
};
</script>
