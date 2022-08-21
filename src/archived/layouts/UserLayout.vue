<template>
  <q-layout view="hHh LpR lFf" class="bg-grey-3">

    <q-header bordered class="bg-grey-10 text-white">
      <UserLayoutToolbar />
    </q-header>

    <UserLayoutDrawer />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import UserLayoutToolbar from "components/UserLayout/UserLayoutToolbar.vue";
import UserLayoutDrawer from "components/UserLayout/UserLayoutDrawer.vue";
import { useUsersStore } from "stores/users";
import { storeToRefs } from "pinia/dist/pinia";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router/dist/vue-router";


export default {
  name: 'UserLayout',
  components: { UserLayoutDrawer, UserLayoutToolbar },
  setup () {
    const router = useRouter()
    const authStore = useAuthStore();
    let { user } = authStore;
    if (!user) {
      router.push({ path: '/home' });
    }

    const usersStore = useUsersStore();
    const { getActiveUser } = usersStore;
    const { activeUser } = storeToRefs(usersStore)
    getActiveUser();

    return{
      activeUser
    }
  }
}
</script>
