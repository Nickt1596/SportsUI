<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from "stores/auth";
export default {
  name: 'AccountLayout',
  setup () {
    const router = useRouter()
    const authStore = useAuthStore();
    const { user } = authStore;
    if (user) {
      router.push({ path: '/home' });
    }
    return {

    }
  }
}
</script>
