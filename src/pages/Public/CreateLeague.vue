<template>
  <q-page class="flex flex-center bg-grey-3" padding>
    <div class="full-width full-height" style="max-width: 1200px">
      <q-card square bordered class="q-pa-sm">
        <CreateLeagueForm @on-submit="onSubmit" v-if="!leagueCreated" />
        <CreateLeagueSuccess v-else/>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import CreateLeagueForm from "components/Public/CreateLeague/CreateLeagueForm.vue";
import { useRouter } from "vue-router/dist/vue-router";
import { useAuthStore } from "stores/auth";
import { useQuasar } from "quasar";
import { useAlertStore } from "stores/alert";
import { useLeagueStore } from "stores/league";
import CreateLeagueSuccess from "components/Public/CreateLeague/CreateLeagueSuccess.vue";

export default {
  name: "CreateLeague",
  // components: { CreateLeagueSuccess },
  components: { CreateLeagueSuccess, CreateLeagueForm },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore();
    let { user } = authStore;
    if (!user) {
      router.push({ path: '/home' });
    }

    const $q = useQuasar();

    const leagueCreated = ref(false);

    async function onSubmit(values) {
      const alertStore = useAlertStore();
      const { success, error } = alertStore;
      const leagueStore = useLeagueStore();
      const { leagueCreation } = leagueStore;
      try{
        await leagueCreation(values);
        success("League Created Successfully")
        leagueCreated.value = true;
      }catch(e){
        error(e)
      }
      const { alert, clear } = alertStore;
      if (alert !== null) {
        $q.notify(alert);
        clear();
      }
    }

    return {
      leagueCreated,
      onSubmit,
    };
  },
};
</script>
