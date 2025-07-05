<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Drawer from './components/Drawer.vue'
import BurgerMenu from './components/BurgerMenu.vue'
import { ref, watch, provide, computed } from 'vue'

const cart = ref([])
const drawerOpen = ref(false)
const burgerOpen = ref(false)

const totalPrice = computed(() =>
  cart.value.reduce(
    (acc, cur) => acc + Math.round(cur.price * (1 - cur.discountPercent / 100)).toFixed(2) * cur.quantity,
    0,
  ),
)
const totalItems = computed(() => cart.value.reduce((acc, cur) => acc + cur.quantity, 0))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const burgerMenuOpen = () => {
  burgerOpen.value = true
}
const closeBurger = () => {
  burgerOpen.value = false
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}
const changeItemQuantity = (productId, newQuantity) => {
  const item = cart.value.find((i) => i.id === productId)
  if (item) {
    item.quantity = newQuantity
    console.log(`Обновлено: Товар ${productId} — количество ${newQuantity}`)
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
  changeItemQuantity,
  closeBurger,
})
</script>
<template>
  <BurgerMenu v-if="burgerOpen" />
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :total-items="totalItems" />
  <Header @open-drawer="openDrawer" @burger-menu-open="burgerMenuOpen" :total-items="totalItems"></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style scoped></style>
