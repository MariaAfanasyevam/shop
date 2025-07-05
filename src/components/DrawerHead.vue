<script setup>
import { inject } from 'vue'
const { closeDrawer } = inject('cart')
defineProps({
  totalItems: Number,
})
</script>
<template>
  <div class="sidebar-title">
    <img class="nav__link" @click="closeDrawer" src="/img/arrow-sidebar.svg" alt="cart-sidebar" />
    <h1>Shopping bag</h1>
  </div>
  <div class="items">{{ totalItems }} items</div>
</template>
