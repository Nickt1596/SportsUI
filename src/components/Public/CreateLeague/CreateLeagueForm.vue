<template>
  <q-card-section class="text-center">
    <h6 class="q-my-sm">League Details</h6>
    <q-separator />
  </q-card-section>
  <Form @submit="onSubmit" :validation-schema="schema">
    <q-card-section class="row">
      <q-card-section class="col-6">
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
        <Field name="city" v-slot="{ errorMessage, value, field }">
          <q-input
            filled
            class="q-mb-sm q-pt-md"
            label="City"
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
            class="q-mb-sm q-pt-md"
            label="Zip Code"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          >
          </q-input>
        </Field>
        <Field name="sport" v-slot="{ errorMessage, value, field }">
          <q-select
            filled
            class="q-mb-sm q-pt-md"
            :options="sports"
            label="Sport"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          >
          </q-select>
        </Field>
      </q-card-section>
      <q-card-section class="col-6">
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
        <Field name="state" v-slot="{ errorMessage, value, field }">
          <q-select
            filled
            class="q-mb-sm q-pt-md"
            :options="states"
            label="State"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          >
          </q-select>
        </Field>
        <Field name="name" v-slot="{ errorMessage, value, field }">
          <q-input
            filled
            class="q-mb-sm q-pt-md"
            label="League Name"
            :model-value="value"
            v-bind="field"
            :error-message="errorMessage"
            :error="!!errorMessage"
          >
          </q-input>
        </Field>
      </q-card-section>
    </q-card-section>
    <q-separator />
    <q-card-section class="row">
      <q-btn unelevated flat class="q-ml-md" label="< Back" color="primary" />
      <q-space />
      <q-btn
        unelevated
        class="q-mr-md"
        label="Create League"
        color="primary"
        type="submit"
      />
    </q-card-section>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { ref } from "vue";
export default {
  name: "CreateLeagueForm",
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field },
  setup(props, context) {

    const schema = Yup.object().shape({
      address1: Yup.string().required("Address is Required"),
      address2: Yup.string(),
      city: Yup.string().required("City is Required"),
      state: Yup.string().required("State is Required"),
      zip_code: Yup.string().required("Zip Code is Required"),
      name: Yup.string().required("League Name is Required"),
      sport: Yup.string().required("Sport is Required"),
    });

    const states = ref([
      "Alabama",
      "Alaska",
      "American Samoa",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Federated States of Micronesia",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Marshall Islands",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Northern Mariana Islands",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Palau",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virgin Island",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ]);

    const sports = ref([
      "Football",
      "Baseball",
      "Soccer",
      "Ice Hockey",
      "Roller Hockey",
      "Floor Hockey",
      "Lacrosse",
      "Softball",
      "Wrestling",
    ]);

    const onSubmit = (event) => {
      context.emit("onSubmit", event);
    };


    return {
      states,
      sports,
      schema,
      onSubmit,
    };
  },
};
</script>
