import Home from '../pages/home/home.vue'
import Shop from '../pages/shop/shop.vue'
import Product from '../pages/productPage/product.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/product/:id', name: 'Product', component: Product },
]
export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to, from) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});