<template>
  <q-page class="flex flex-center bg-grey-3" padding>
    <div class="full-width full-height" style="max-width: 400px">
      <q-card square bordered class="q-pa-lg">
        <FormHeader />
        <ResetRequestForm
          @on-submit="onSubmit"
          v-if="!requestSent && !resetParams"
        />
        <ResetRequestSent
          v-if="requestSent && !resetParams"
          :request-email="requestEmail"
        />
        <ResetPasswordForm
          @on-submit-new-password="onSubmitNewPassword"
          v-if="resetParams && !passwordChangeSuccess"
        />
        <ResetPasswordSuccess v-if="resetParams && passwordChangeSuccess" />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import FormHeader from "components/Account/Shared/FormHeader.vue";
import ResetRequestForm from "components/Account/ResetPassword/ResetRequestForm.vue";
import ResetPasswordForm from "components/Account/ResetPassword/ResetPasswordForm.vue";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useAlertStore } from "stores/alert";
import { useUsersStore } from "stores/users";
import ResetRequestSent from "components/Account/ResetPassword/ResetRequestSent.vue";
import { useRoute } from "vue-router/dist/vue-router";
import { onMounted } from "vue";
import ResetPasswordSuccess from "components/Account/ResetPassword/ResetPasswordSuccess.vue";
export default {
  name: "ResetPassword",
  components: {
    ResetPasswordSuccess,
    ResetRequestSent,
    ResetRequestForm,
    FormHeader,
    ResetPasswordForm,
  },
  setup() {
    const $q = useQuasar();
    const requestSent = ref(false);
    const requestEmail = ref("");
    const resetParams = ref(false);
    const uid = ref(null);
    const token = ref(null);
    const passwordChangeSuccess = ref(false);

    onMounted(async () => {
      const route = useRoute();
      if (route.params.uid && route.params.token) {
        resetParams.value = true;
        uid.value = route.params.uid;
        token.value = route.params.token;
      }
    });

    async function onSubmit(values) {
      const alertStore = useAlertStore();
      const usersStore = useUsersStore();
      const { resetPasswordRequest } = usersStore;
      const { success, error } = alertStore;
      try {
        await resetPasswordRequest(values);
        success("Password Reset Email Sent");
        requestSent.value = true;
        requestEmail.value = values.email;
      } catch (e) {
        error(e);
      }
      const { alert, clear } = alertStore;
      if (alert !== null) {
        $q.notify(alert);
        clear();
      }
    }

    async function onSubmitNewPassword(values) {
      const alertStore = useAlertStore();
      const usersStore = useUsersStore();
      const { resetPasswordConfirm } = usersStore;
      const { success, error } = alertStore;
      values.uid = uid.value;
      values.token = token.value;
      try {
        await resetPasswordConfirm(values);
        success("Password Reset Successfully");
        passwordChangeSuccess.value = true;
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
      onSubmit,
      onSubmitNewPassword,
      requestSent,
      requestEmail,
      resetParams,
      passwordChangeSuccess,
    };
  },
};
</script>
