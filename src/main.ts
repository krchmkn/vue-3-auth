import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import '@picocss/pico/css/pico.css'

const app = createApp(App)
app.use(router)

router.beforeEach((to) => {
  // if (to.meta.requiresAuth /*&& !auth.isLoggedIn()*/) {
  //   return {
  //     name: 'login',
  //     query: { redirect: to.fullPath },
  //   }
  // }
})

app.mount('#app')
