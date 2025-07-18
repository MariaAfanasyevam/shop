<script setup>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import Cart from './components/cart.vue'
import BurgerMenu from './components/burger-menu.vue'
import {useCartStore} from './store/cartStore'


const cartStore= useCartStore()
</script>
<template>

  <Cart v-if="cartStore.drawerOpen" :total-price="cartStore.totalPrice" :total-items="cartStore.totalItems" />
  <Header @open-drawer="cartStore.openDrawer" @burger-menu-open="cartStore.burgerMenuOpen" :total-items="cartStore.totalItems"></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style scoped></style>
