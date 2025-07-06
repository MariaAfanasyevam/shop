<script setup>

import CartItem from './CartItem.vue'
import { useCartStore } from '../store/cartStore.js'

const cartStore = useCartStore()

</script>
<template>
  <div class="items-container" v-auto-animate>
    <CartItem
      v-for="item in cartStore.cart" :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
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
