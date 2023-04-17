import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@picocss/pico/css/pico.css'

import plugin from 'npmpackage'

const app = createApp(App)
app.use(router)
app.use(plugin, router)

app.mount('#app')
