import { createApp } from 'vue'
import './styles/style.css'
import {router} from "./route/router.js"
import App from './App.vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)


const pinia = createPinia()


pinia.use(piniaPluginPersistedstate)
app.use(router).use(pinia).use(autoAnimatePlugin).mount('#app')
