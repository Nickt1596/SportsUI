<template>
  <q-btn round flat>
    <q-avatar color="primary" text-color="white" size="32px">
      {{ initials }}
    </q-avatar>
    <q-menu fit>
      <div class="row no-wrap q-pa-md" style="min-width: 400px">
        <div class="column text-left">
          <q-btn flat dense label="Account Settings" style="width: 100%" />
          <q-btn flat dense label="My Portal" style="width: 100%" />
          <q-btn
            flat
            color="primary"
            label="Logout"
            push
            size="md"
            @click="logout"
          />
        </div>
        <q-space />
        <q-separator vertical inset class="q-mx-lg" />
        <div class="column items-center">
          <q-avatar color="primary" text-color="white" size="50px">
            {{ initials }}
          </q-avatar>
          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ activeUser.first_name }} {{ activeUser.last_name }}
          </div>
        </div>
      </div>
    </q-menu>
    <q-tooltip>Account</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  props: {
    initials: String,
    activeUser: {},
  },
  name: "ToolbarProfile",
  setup(props, context) {
    const logout = (event) => {
      context.emit("logout", event);
    };
    return {
      logout,
    };
  },
};
</script>
