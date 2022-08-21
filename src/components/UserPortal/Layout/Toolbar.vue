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

      <q-btn-dropdown stretch flat label="My Teams">
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Team 1</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Team 2</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>Team 3</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn round dense flat color="text-grey-7" icon="chat" class="q-mr-sm">
        <q-tooltip>Messenger</q-tooltip>
      </q-btn>

      <q-btn round dense flat color="text-grey-7" icon="mail" to="inbox" class="q-mr-sm">
        <q-badge color="red" text-color="white" floating>
          2
        </q-badge>
        <q-tooltip>Inbox</q-tooltip>
      </q-btn>

      <q-btn round flat v-if="activeUser">
        <q-avatar color="primary" text-color="white" size="32px">
          {{ getInitials() }}
        </q-avatar>
        <q-menu fit >
          <div class="row no-wrap q-pa-md" style="min-width: 400px">
            <div class="column text-left">
              <q-btn flat dense label="Account Settings" style="width: 100%;"/>
              <q-btn flat dense label="My Portal" style="width: 100%;"/>
              <q-btn
                flat
                color="primary"
                label="Logout"
                push
                size="md"
                @click="logout"
              />
            </div>
            <q-space/>
            <q-separator vertical inset class="q-mx-lg" />
            <div class="column items-center">
              <q-avatar color="primary" text-color="white" size="50px">
                {{ getInitials() }}
              </q-avatar>
              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ activeUser.first_name }} {{ activeUser.last_name }}</div>
            </div>
          </div>
        </q-menu>
        <q-tooltip>Account</q-tooltip>
      </q-btn>

    </div>

  </q-toolbar>
</template>

<script>
import { useAuthStore } from "stores/auth";
import { useUsersStore } from "stores/users";
import { storeToRefs } from "pinia/dist/pinia";
import { ref } from "vue";

export default {
  name: 'UserToolbar',
  setup () {
    const authStore = useAuthStore();
    const { logout } = authStore
    const usersStore = useUsersStore();
    const { getActiveUser } = usersStore;
    getActiveUser()
    const { activeUser } = storeToRefs(usersStore)


    const getInitials = () => {
      if ('first_name' in activeUser.value){
        return activeUser.value.first_name[0] + activeUser.value.last_name[0];
      }
    }

    return {
      logout,
      activeUser,
      getInitials
    }
  }
}
</script>
