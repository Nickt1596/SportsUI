<template>
  <q-layout view="hHh LpR lFf" class="bg-grey-3">

    <q-header bordered class="bg-grey-10 text-white">
      <UserToolbar v-if="userPortal" />
      <OrganizationToolbar v-if="organizationPortal" />
    </q-header>

    <UserDrawer v-if="userPortal" />
    <OrganizationDrawer v-if="organizationPortal" />

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router/dist/vue-router";
import { useAuthStore } from "stores/auth";
import UserDrawer from "components/UserPortal/Layout/Drawer.vue";
import UserToolbar from "components/UserPortal/Layout/Toolbar.vue";
import OrganizationToolbar from "components/OrganizationPortal/Layout/Toolbar.vue";
import OrganizationDrawer from "components/OrganizationPortal/Layout/Drawer.vue";
import { useUsersStore } from "stores/users";
import { storeToRefs } from "pinia/dist/pinia";

export default {
  name: 'PortalLayout',
  components: { OrganizationDrawer, OrganizationToolbar, UserToolbar, UserDrawer },
  setup () {
    const router = useRouter()
    const authStore = useAuthStore();
    const usersStore = useUsersStore();
    let { user } = authStore;
    if (!user) {
      router.push({ path: '/home' });
    }

    const userPortal = ref(false)
    const organizationPortal = ref(false)

    onMounted(async () => {
      const router = useRouter();
      if(router.currentRoute.value.path.includes("/organization")){
        organizationPortal.value = true;
      }
      else if(router.currentRoute.value.path.includes("/user")){
        userPortal.value = true;
      }
    });

    const { activeUser } = storeToRefs(usersStore)

    return {
      userPortal,
      organizationPortal,
      activeUser
    }
  }
}
</script>
