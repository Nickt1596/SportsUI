<template>
  <q-dialog ref="addDivisionDialogRef">
    <div class="full-width" style="max-width: 600px">
      <q-form @submit="saveDivisions">
        <q-card>
          <q-card-section class="row items-center q-pb-md">
            <div class="text-h6">Add Divisions</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-md">
            <div
              class="column q-pa-sm"
              v-for="(div, index) in newDivisions"
              :key="div.id"
            >
              <div class="row justify-center">
                <q-input
                  square
                  outlined
                  dense
                  v-model="div.name"
                  type="text"
                  label="Division Name"
                  :rules="divisionNameRules"
                  class="col-10"
                />
                <div class="col-1">
                  <q-btn
                    v-if="index > 0"
                    class="q-ml-sm"
                    icon="delete"
                    size="md"
                    flat
                    @click="removeDivisionField(index)"
                  />
                </div>
                <div class="col-1">
                  <q-btn
                    class="q-ml-sm"
                    icon="add"
                    size="md"
                    flat
                    @click="addDivisionField"
                  />
                </div>
              </div>
            </div>
            <q-separator />
            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="Cancel" />
              <q-btn color="primary" type="submit" label="Add Divisions" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useDivisionStore } from "stores/division";

export default {
  name: "AddDivisionDialog",
  setup() {
    const divisionStore = useDivisionStore();
    const { addDivisions } = divisionStore;

    const newDivisions = ref([]);
    newDivisions.value.push({
      name: "",
    });

    function addDivisionField() {
      newDivisions.value.push({
        name: "",
      });
    }

    function removeDivisionField(index) {
      newDivisions.value.splice(index, 1);
    }

    function saveDivisions() {
      addDivisions(newDivisions.value);
      addDivisionDialogRef.value.hide();
    }

    const isValid = ref(false);
    const addDivisionDialogRef = ref(null);

    return {
      newDivisions,
      isValid,
      addDivisionDialogRef,
      addDivisionField,
      removeDivisionField,
      saveDivisions,
      divisionNameRules: [
        (val) => (val && val.length > 0) || "Please type something",
      ],
    };
  },
};
</script>
