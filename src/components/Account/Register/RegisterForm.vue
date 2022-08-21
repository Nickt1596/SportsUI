<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <q-card-section>
      <p class="text-left text-bold">Let's Create an Account</p>
      <Field name="email" v-slot="{ errorMessage, value, field }">
        <q-input
          stack-label
          filled
          class="q-mb-sm"
          label="Email *"
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
      <Field name="password1" v-slot="{ errorMessage, value, field }">
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
      <Field name="password2" v-slot="{ errorMessage, value, field }">
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
      <Field name="first_name" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="First Name"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
        </q-input>
      </Field>
      <Field name="last_name" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="Last Name"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
        </q-input>
      </Field>
      <Field name="address1" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="Address Line 1"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
        </q-input>
      </Field>
      <Field name="address2" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="Address Line 2"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
        </q-input>
      </Field>
      <Field name="city" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="City"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
        </q-input>
      </Field>
      <Field name="state" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="State"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
        </q-input>
      </Field>
      <Field name="zipcode" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="Zip Code"
          :model-value="value"
          v-bind="field"
          :error-message="errorMessage"
          :error="!!errorMessage"
        >
        </q-input>
      </Field>
      <Field name="phone_number" v-slot="{ errorMessage, value, field }">
        <q-input
          filled
          class="q-mb-sm"
          label="Phone Number"
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
        label="Sign Up"
        class="full-width"
        color="primary"
        type="submit"
      />
      <p class="text-grey-6 text-center q-mt-lg">Already have an account?</p>
      <div class="text-center">
        <q-btn no-caps flat :to="{ name: 'AccountLogin' }" class="q-mt-none">
          Login
        </q-btn>
      </div>
    </q-card-section>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
export default {
  name: "RegisterForm",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field },
  setup(props, context) {
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password1: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      password2: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password1")], "Passwords do not match"),
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      address1: Yup.string().required("Address is required"),
      address2: Yup.string(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipcode: Yup.string().required("Zip Code is required"),
      phone_number: Yup.string().required("Phone Number is required"),
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
