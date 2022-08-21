<template>
  <q-page class="flex flex-center bg-grey-3" padding>
    <div class="full-width full-height" style="max-width: 400px">
      <q-card square bordered class="q-pa-lg">
        <FormHeader />
        <LoginForm @on-submit="onSubmit"  v-if="!notVerified" />
        <NotVerified :verification-email="verificationEmail" v-else />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useAuthStore } from "stores/auth";
import { useQuasar } from "quasar";
import { useAlertStore } from "stores/alert";
import { ref } from "vue";
import LoginForm from "components/Account/Login/LoginForm.vue";
import FormHeader from "components/Account/Shared/FormHeader.vue";
import NotVerified from "components/Account/Verify/NotVerified.vue";

export default {
  name: "LoginPage",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { NotVerified, FormHeader, LoginForm },
  setup() {
    const $q = useQuasar();
    const notVerified = ref(false)
    const verificationEmail = ref("");

    async function onSubmit(values) {
      const authStore = useAuthStore();
      const alertStore = useAlertStore();
      const { login } = authStore;
      const { email, password } = values;
      await login(email, password);
      const { emailNotVerified } = authStore;
      if (emailNotVerified){
        notVerified.value = emailNotVerified;
        verificationEmail.value = email
      }
      const { alert, clear } = alertStore;
      if (alert !== null) {
        $q.notify(alert);
        clear();
      }
    }

    return {
      notVerified,
      verificationEmail,
      onSubmit,
    };
  },
};
</script>
