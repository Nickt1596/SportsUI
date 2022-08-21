import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { fetchWrapper } from "src/helpers/fetch-wrapper.js";
import { useAlertStore } from "stores/alert";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    router: useRouter(),
    emailNotVerified: null
  }),

  actions: {
    async login(email, password){
      try {
        const user = await fetchWrapper.post('http://127.0.0.1:8000/api/v1/dj-rest-auth/login/', {email, password});

        this.user = user;

        localStorage.setItem('user', JSON.stringify(user));

        this.router.push({ path: '/home' });

      } catch (e){
        if(e === "E-mail is not verified."){
          this.emailNotVerified = true;
        }
        const alertStore = useAlertStore();
        const { error } = alertStore;
        error(e);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      this.router.push({ path: '/' });
      // this.router.go();
    }
  }
})
