<template>
  <Form @submit="onSubmitNewPassword" :validation-schema="schema">
    <q-card-section>
      <p class="text-left text-bold">Reset Account Password</p>
      <Field name="new_password1" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="Password *"
          type="password"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
        </q-input>
      </Field>
      <Field name="new_password2" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="Confirm Password *"
          type="password"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
        </q-input>
      </Field>
      <q-btn
        unelevated
        size="lg"
        label="Reset Password"
        class="full-width"
        color="primary"
        type="submit"
      />
    </q-card-section>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "ResetPasswordForm",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field },
  setup(props, context) {
    const schema = Yup.object().shape({
      new_password1: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      new_password2: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("new_password1")], "Passwords do not match"),
    });
    const onSubmitNewPassword = (event) => {
      context.emit("onSubmitNewPassword", event);
    };
    return {
      schema,
      onSubmitNewPassword,
    };
  },
};
</script>
