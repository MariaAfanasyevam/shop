import Home from '../pages/home/home.vue'
import Shop from '../pages/shop/shop.vue'
import Product from '../pages/productPage/product.vue'
import { createRouter, createWebHistory } from 'vue-router'

export enum RouteNames {
  Home ='Home',
  Shop = 'Shop',
  Product = 'Product',
}


const routes = [
  { path: '/', name: RouteNames.Home, component: Home },
  { path: '/shop', name: RouteNames.Shop, component: Shop },
  { path: '/product/:id', name: RouteNames.Product, component: Product, props: true },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})


router.afterEach((to, from) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});