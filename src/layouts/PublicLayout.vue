<template>
  <q-layout view="hHh lpr lFr">

    <q-header elevated class="bg-primary text-white">
      <PublicToolbar :logged-in="loggedIn" :is-user="isUser" :is-staff="isStaff" />
    </q-header>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import PublicToolbar from "components/Public/Layout/Toolbar.vue";
import { useAuthStore } from "stores/auth";
import { useUsersStore } from "stores/users";
import { storeToRefs } from "pinia/dist/pinia";

export default {
  name: 'PublicLayout',
  components: { PublicToolbar },
  setup () {
    const loggedIn = ref(false)

    const authStore = useAuthStore();
    const usersStore = useUsersStore();
    let { user } = authStore;
    const { activeUser } = storeToRefs(usersStore)
    if (user) {
      loggedIn.value = true;
      const { getActiveUser } = usersStore;
      getActiveUser();
    }

    function isUser(){
      if (activeUser.length > 0){
        return activeUser.value.user_profile.is_user;
      }
    }
    function isStaff(){
      if (activeUser.length > 0){
        return activeUser.value.user_profile.is_staff;
      }
    }

    return {
      activeUser,
      loggedIn,
      isUser,
      isStaff
    }
  }
}
</script>
