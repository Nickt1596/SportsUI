<template>
  <q-drawer v-model="checkSeasonRoute" side="left" bordered class="bg-grey-9" :width="250" elevated >
    <q-scroll-area class="fit">
      <q-list>

        <q-item header style="height: 175px" class="bg-grey-10">
          <q-item-section class="flex-center" v-if="activeUser">
            <q-avatar color="primary" text-color="white" size="100px" font-size="52px" class="q-mb-lg">
              {{ getInitials() }}
            </q-avatar>
            <div class="text-bold text-white">
              {{ activeUser.first_name }} {{ activeUser.last_name }}
            </div>
          </q-item-section>
        </q-item>

        <q-item :to="{ name: 'UserHome' }" class="text-grey-4" clickable v-ripple dark active-class="bg-grey-8">
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item :to="{ name: 'UserFamily' }" class="text-grey-4" clickable v-ripple dark active-class="bg-grey-8">
          <q-item-section>Family</q-item-section>
        </q-item>

        <q-item :to="{ name: 'UserSchedule' }" class="text-grey-4" clickable v-ripple dark active-class="bg-grey-8">
          <q-item-section>Schedule</q-item-section>
        </q-item>

        <q-item :to="{ name: 'UserTeams' }" class="text-grey-4" clickable v-ripple dark active-class="bg-grey-8">
          <q-item-section>Teams</q-item-section>
        </q-item>

        <q-item :to="{ name: 'UserBills' }" class="text-grey-4" clickable v-ripple dark active-class="bg-grey-8">
          <q-item-section>Bills</q-item-section>
        </q-item>

        <q-item :to="{ name: 'UserRegistrations' }" class="text-grey-4" clickable v-ripple dark active-class="bg-grey-8">
          <q-item-section>Registrations</q-item-section>
        </q-item>

        <q-item :to="{ name: 'UserSettings' }" class="text-grey-4" clickable v-ripple dark active-class="bg-grey-8">
          <q-item-section>Settings</q-item-section>
        </q-item>

        <q-item :to="{ name: 'PublicHome' }" class="text-grey-4 absolute-bottom" clickable v-ripple dark>
          <q-item-section>Go To Sports Management</q-item-section>
        </q-item>

      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { useRoute } from "vue-router/dist/vue-router";
import { computed } from "vue";
import { useUsersStore } from "stores/users";
import { storeToRefs } from "pinia/dist/pinia";

export default {
  name: 'UserDrawer',
  setup () {
    const route = useRoute()
    const checkSeasonRoute = computed(() =>{
      return !(route.name === 'season');
    });

    const usersStore = useUsersStore();
    const { getActiveUser } = usersStore;
    getActiveUser()
    const { activeUser } = storeToRefs(usersStore)

    const getInitials = () => {
      if ('first_name' in activeUser.value){
        return activeUser.value.first_name[0] + activeUser.value.last_name[0];
      }
    }

    return{
      checkSeasonRoute,
      activeUser,
      getInitials
    }
  }
}
</script>
