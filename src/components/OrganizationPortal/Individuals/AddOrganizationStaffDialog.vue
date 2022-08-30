<template>
  <q-dialog>
    <div class="full-width" style="max-width: 600px">
      <q-card>
        <q-card-section class="row text-center q-mr-md q-ml-md">
          <div class="text-h6">Add Member</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <Form @submit="onSubmit" :validation-schema="schema">
          <q-card-section style="max-height: 50vh" class="scroll">
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
            <Field name="zip_code" v-slot="{ errorMessage, value, field }">
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
          </q-card-section>
          <q-separator />

          <q-card-actions align="right" class="q-mr-lg">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn unelevated label="Add" color="primary" type="submit" />
          </q-card-actions>
        </Form>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "AddOrganizationStaffDialog",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field },
  setup(props, context) {
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is Required"),
      first_name: Yup.string().required("First Name is Required"),
      last_name: Yup.string().required("Last Name is Required"),
      address1: Yup.string(),
      address2: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zip_code: Yup.string(),
      phone_number: Yup.string(),
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
