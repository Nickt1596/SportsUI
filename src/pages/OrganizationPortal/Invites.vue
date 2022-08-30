<template>
  <q-page>
    <q-card flat>
      <PageHeader title="Invites" />
      <HeaderTabs :tabs="tabs" :selected="selected" @update-selected="updateSelected" />
      <q-separator />
    </q-card>
    <div class="q-pa-lg">
      <div class="q-gutter-y-lg">
        <div class="row justify-center">
          <div class="col">
            <q-tab-panels v-model="selected" animated class="bg-grey-3">
              <PendingInvitesPanel :name="selected" v-model="selected" v-if="selected === 'pending'" />
              <SettingsPanel :name="selected" v-model="selected" v-if="selected === 'settings'" />
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PageHeader from "components/OrganizationPortal/Shared/PageHeader.vue";
import HeaderTabs from "components/OrganizationPortal/Shared/HeaderTabs.vue";
import { ref } from "vue";
import PendingInvitesPanel from "components/OrganizationPortal/Invites/PendingInvitesPanel.vue";
import SettingsPanel from "components/OrganizationPortal/Invites/SettingsPanel.vue";
export default {
  name: 'OrganizationInvites',
  components: { SettingsPanel, PendingInvitesPanel, PageHeader, HeaderTabs },
  setup() {
    const selected = ref("pending");
    const tabs = [
      {
        name: 'pending',
        label: 'Pending Invites'
      },
      {
        name: 'settings',
        label: 'Settings'
      },
    ]
    const updateSelected = (value) => {
      selected.value=value;
    }
    return {
      selected,
      tabs,
      updateSelected
    }
  }
}
</script>
