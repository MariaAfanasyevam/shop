import { createApp } from 'vue'
import './styles/style.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Shop from './pages/Shop.vue'
import Profile from './pages/Profile.vue'
import { createPinia } from 'pinia'
import ProductPage from './pages/ProductPage.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/product/:id', name: 'Product', component: ProductPage },
]
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
})

pinia.use(piniaPluginPersistedstate)
app.use(router).use(pinia).use(autoAnimatePlugin).mount('#app')
