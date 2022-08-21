<template>
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ isSubmitting }"
  >
    <q-card-section>
      <p class="text-left text-bold">Forgot your password?</p>
      <p class="text-caption">Please enter the email you use to sign in to sports management.</p>
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
      <q-btn
        unelevated
        size="lg"
        label="Request Password Reset"
        class="full-width"
        color="primary"
        type="submit"
        :disabled="isSubmitting"
        :loading="isSubmitting"
      />
      <q-btn no-caps flat :to="{ name: 'AccountLogin' }" class="q-mt-none">
        Back to Sign in
      </q-btn>
    </q-card-section>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
export default {
  name: 'ResetRequestForm',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field },
  setup (props, context) {
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required"),
    });
    const onSubmit = (event) => {
      context.emit("onSubmit", event);
    };
    return {
      schema,
      onSubmit,
    }
  }
}
</script>
