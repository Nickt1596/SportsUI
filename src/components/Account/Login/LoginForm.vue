<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ isSubmitting }"
  >
    <q-card-section>
      <Field name="email" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-md"
          label="Email"
          placeholder="email@example.com"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </Field>
      <Field name="password" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="Password"
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
        label="Login"
        class="full-width"
        color="primary"
        type="submit"
        :disabled="isSubmitting"
        :loading="isSubmitting"
      />
      <div class="text-center row">
        <q-btn no-caps flat :to="{ name: 'AccountResetPassword' }" class="q-mt-none">
          Forgot Password?
        </q-btn>
        <q-space />
        <q-btn no-caps flat :to="{ name: 'AccountRegister' }" class="q-mt-none">
          Create Account
        </q-btn>
      </div>
    </q-card-section>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
export default {
  name: "LoginForm",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field },
  setup(props, context) {
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    });

    const onSubmit = (event) => {
      context.emit("onSubmit", event);
    };

    return {
      schema,
      onSubmit,
    };
  },
};
</script>
