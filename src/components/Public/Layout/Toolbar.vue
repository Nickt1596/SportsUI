<template>
  <q-toolbar>

    <q-toolbar-title>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>
      Sports Management System
    </q-toolbar-title>

    <q-space />

    <div class="q-gutter-sm row items-center no-wrap">

      <q-btn dense flat color="text-grey-7" label="Home" class="q-mr-sm" :to="{ name: 'PublicHome' }">
        <q-tooltip>Home</q-tooltip>
      </q-btn>

      <q-btn dense flat color="text-grey-7" label="Find Leagues" class="q-mr-sm" :to="{ name: 'PublicFindLeagues' }">
        <q-tooltip>Find Leagues</q-tooltip>
      </q-btn>

      <q-btn dense flat color="text-grey-7" label="Find Events" class="q-mr-sm" :to="{ name: 'PublicFindEvents' }">
        <q-tooltip>Find Events</q-tooltip>
      </q-btn>

      <q-btn v-if="loggedIn" dense flat color="text-grey-7" label="Create League" class="q-mr-sm" :to="{ name: 'PublicCreateLeague' }">
        <q-tooltip>Create League</q-tooltip>
      </q-btn>

      <div v-if="!loggedIn">
        <q-btn dense flat color="text-grey-7" label="Sign In" class="q-mr-sm" :to="{ name: 'AccountLogin' }">
          <q-tooltip>Sign in</q-tooltip>
        </q-btn>
      </div>

      <div v-else>
        <q-btn dense flat color="text-grey-7" label="Org Portal" class="q-mr-sm" :to="{ name: 'OrganizationHome' }" v-if="isStaff">
          <q-tooltip>Organization Portal</q-tooltip>
        </q-btn>
        <q-btn dense flat color="text-grey-7" label="User Portal" class="q-mr-sm" :to="{ name: 'UserHome' }" v-if="isUser">
          <q-tooltip>User Portal</q-tooltip>
        </q-btn>
        <q-btn dense flat color="text-grey-7" label="Logout" class="q-mr-sm" @click="logout">
          <q-tooltip>Logout</q-tooltip>
        </q-btn>
      </div>

    </div>

  </q-toolbar>
</template>

<script>
import { useAuthStore } from "stores/auth";

export default {
  name: 'PublicToolbar',
  props: {
    loggedIn: Boolean,
    isUser: {
      Boolean,
      default: false,
      required: false,
    },
    isStaff: Boolean,
  },
  setup (props) {
    const authStore = useAuthStore();
    const { logout } = authStore
    return {
      logout
    }
  }
}
</script>
