<script setup>
import './styles/style.css'
import Header from './components/header/header.vue'
import Footer from './components/footer/footer.vue'
import Cart from './components/cart/cart.vue'
import {useCartStore} from './store/cartStore'
import Notification from './components/notification/notification.vue'
import { storeToRefs } from 'pinia'

const cartStore= useCartStore()
const { notification } = storeToRefs(cartStore)
</script>

<template>
  <Notification
    v-model:show="notification.show"
    :message="notification.message"
  />
  <Cart v-if="cartStore.drawerOpen" :total-price="cartStore.totalPrice" :total-items="cartStore.totalItems" />
  <Header @open-drawer="cartStore.openDrawer" @burger-menu-open="cartStore.burgerMenuOpen" :total-items="cartStore.totalItems"></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style></style>
