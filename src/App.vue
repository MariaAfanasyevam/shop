<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Drawer from './components/Drawer.vue'
import BurgerMenu from './components/BurgerMenu.vue'
import {useCartStore} from './store/cartStore'


const cartStore= useCartStore()
</script>
<template>
  <BurgerMenu v-if="cartStore.burgerOpen" />
  <Drawer v-if="cartStore.drawerOpen" :total-price="cartStore.totalPrice" :total-items="cartStore.totalItems" />
  <Header @open-drawer="cartStore.openDrawer" @burger-menu-open="cartStore.burgerMenuOpen" :total-items="cartStore.totalItems"></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style scoped></style>
