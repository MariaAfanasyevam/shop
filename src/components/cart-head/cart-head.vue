<script setup lang="ts">
import { useCartStore } from '../../store/cartStore'
const cartStore = useCartStore()

defineProps<{
  totalItems: number
}>()
</script>
<template>
  <div class="cart-head__title">
    <img class="cart-head__link" @click="cartStore.closeDrawer" src="/img/arrow-sidebar.svg" alt="cart-sidebar" />
    <h1>Shopping bag</h1>
  </div>
  <div class="cart-total">{{ totalItems }} items</div>
</template>

<style lang="scss" scoped src="./cart-head.scss"></style>