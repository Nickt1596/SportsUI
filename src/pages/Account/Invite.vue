<template>
  <q-page class="flex flex-center bg-grey-3" padding>
    <div class="full-width full-height" style="max-width: 400px">
      <q-card square bordered class="q-pa-lg">
        <FormHeader />
        <InviteRegisterForm v-if="loaded && !registered" @on-submit="onSubmit" :user-profile="userProfile"/>
        <InviteRegisterSuccess v-if="registered" />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import FormHeader from "components/Account/Shared/FormHeader.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router/dist/vue-router";
import { useUsersStore } from "stores/users";
import { useOrganizationStore } from "stores/organization";
import { storeToRefs } from "pinia/dist/pinia";
import InviteRegisterForm from "components/Account/Invite/InviteRegisterForm.vue";
import { useQuasar } from "quasar";
import { useAlertStore } from "stores/alert";
import InviteRegisterSuccess from "components/Account/Invite/InviteRegisterSuccess.vue";
export default {
  name: 'InvitePage',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { InviteRegisterSuccess, InviteRegisterForm, FormHeader },
  setup() {
    const userProfile = ref({});
    const $q = useQuasar();
    const registered = ref(false);
    const loaded = ref(false);
    const inviteType = ref('');
    const inviteId = ref('');

    onMounted(async () => {
      const route = useRoute();
      inviteType.value = route.params.type
      inviteId.value = route.params.id;
      const organizationStore = useOrganizationStore();
      const { getInviteDetails } = organizationStore;
      try {
        await getInviteDetails(inviteId.value, inviteType.value);
        const { inviteUserProfile } = storeToRefs(organizationStore)
        userProfile.value = inviteUserProfile.value
        loaded.value = true;
      } catch (e) {
        console.log(e);
      }
    });

    async function onSubmit(values){
      const alertStore = useAlertStore();
      const usersStore = useUsersStore();
      const { register } = usersStore;
      const { success, error } = alertStore;
      values.invite_id = inviteId.value;
      values.invite_type = inviteType.value
      try{
        await register(values);
        success("Registration Completed Successfully");
        registered.value = true;
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
      userProfile,
      registered,
      loaded,
      onSubmit,
    }
  }
}
</script>
