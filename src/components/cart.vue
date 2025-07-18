<script setup>
import CartHead from './cart-head.vue'
import CartItemList from './cart-Item-list.vue'
import InfoBlock from './info-block.vue'
import axios from 'axios'
import { computed, ref } from 'vue'


import { useCartStore } from '../store/cartStore'

const cartStore = useCartStore()
const props = defineProps({
  totalPrice: Number,
  buttonDisabled: Boolean,
  totalItems: Number,
})


const isCreating = ref(false)
const cartIsEmpty = computed(() => cartStore.cart.length === 0)

const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)

</script>
<template>
  <main>
    <div class="shop-container container">
      <div id="sidebar1" class="sidebar" aria-label="cart-sidebar">
        <div class="sidebar__content">
          <CartHead :totalItems="totalItems" />

          <div v-if="!totalPrice" class="items-container">
            <InfoBlock title="Корзина пустая" description="Добавьте товары в корзину" imageUrl="/package-icon.png" />
          </div>
          <CartItemList />
        </div>
        <div class="sidebar__content sidebar-footer">
          <div class="subtotal-container">
            <div class="subtotal">Subtotal ( {{ totalItems }} items)</div>
            <div class="total">$ {{ totalPrice }}</div>
          </div>
          <div class="button-wrapper">
            <button class="view-cart" :disabled="buttonDisabled">VIEW CART</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
