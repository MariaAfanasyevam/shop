import { createApp } from 'vue'
import './styles/style.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Shop from './pages/Shop.vue'
import Profile from './pages/Profile.vue'
import ProductPage from './pages/ProductPage.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/product/:id', name: 'Product', component: ProductPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
app.use(router)
app.use(autoAnimatePlugin).mount('#app')
