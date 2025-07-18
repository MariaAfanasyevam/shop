<script setup>
import { useCartStore } from '../store/cartStore'
const cartStore = useCartStore()
defineProps({
  totalItems: Number,
})
</script>
<template>
  <div class="sidebar-title">
    <img class="nav__link" @click="cartStore.closeDrawer" src="/img/arrow-sidebar.svg" alt="cart-sidebar" />
    <h1>Shopping bag</h1>
  </div>
  <div class="items">{{ totalItems }} items</div>
</template>
