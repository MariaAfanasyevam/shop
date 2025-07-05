<script setup>
import { computed, inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCart, changeItemQuantity } = inject('cart')
</script>
<template>
  <div class="items-container" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.image"
      :price="item.price"
      :color="item.color"
      :quantity="item.quantity"
      :discount-price="item.discountPrice"
      :discountPercent="item.discountPercent"
      :itemsInStock="item.itemsInStock"
      @on-click-remove="() => removeFromCart(item)"
      @on-click-change="(payload) => changeItemQuantity(payload.id, payload.quantity)"
    />
  </div>
</template>
