<template>
  <q-card-section>
    <p class="text-left text-bold">
      Your account has not been verified yet.
    </p>
    <p class="text-left text-bold">
      Please click below to resend a verification email to: {{ verificationEmail }}
    </p>
    <q-btn
      unelevated
      dense
      size="lg"
      label="Resend Verification Email"
      class="full-width"
      color="primary"
      @click="resend"
    />
  </q-card-section>
</template>

<script>
import { useAlertStore } from "stores/alert";
import { useUsersStore } from "stores/users";
import { useQuasar } from "quasar";

export default {
  name: "NotVerified",
  props: {
    verificationEmail: String,
  },
  setup(props) {
    const $q = useQuasar();

    async function resend() {
      const alertStore = useAlertStore();
      const usersStore = useUsersStore();
      const { resendEmail } = usersStore;
      const { success, error } = alertStore;
      try {
        await resendEmail({ email: props.verificationEmail });
        success("Resent Verification Email");
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
      resend,
    };
  },
};
</script>
