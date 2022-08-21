import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alert: null
  }),

  actions: {
    success(message) {
      this.alert = { type: 'positive', message: message };
    },
    error(message) {
      this.alert = { type: 'negative', message: message  };
    },
    clear() {
      this.alert = null;
    }
  }
})
