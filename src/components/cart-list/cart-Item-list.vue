<script setup>
import CartItem from '../cart-item/cart-item.vue'
import { useCartStore } from '../../store/cartStore.js'

const cartStore = useCartStore()
</script>
<template>
  <div class="cart-items__container" v-auto-animate>
    <CartItem
      v-for="item in cartStore.cart"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image="item.image"
      :price="item.price"
      :color="item.color"
      :quantity="item.quantity"
      :productId="item.documentId"
      :discount-price="item.discountPrice"
      :discountPercent="item.discountPercent"
      :itemsInStock="item.itemsInStock"
    />
  </div>
</template>
<style lang="scss" src="./cart-item-list.scss" scoped></style>