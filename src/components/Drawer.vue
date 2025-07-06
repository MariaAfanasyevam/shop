<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'
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
const orderId = ref(null)
const cartIsEmpty = computed(() => cartStore.cart.length === 0)

const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)

// const createOrder = async () => {
//   try {
//     isCreating.value = true
//     const { data } = await axios.post(`https://81c31a2e3155d8c0.mokky.dev/orders`, {
//       items: cartStore.cart.value,
//       totalPrice: props.totalPrice,
//     })
//     cartStore.cart.value = []
//     orderId.value = data.id
//   } catch (err) {
//     console.log(err)
//   } finally {
//     isCreating.value = false
//   }
// }
</script>
<template>
  <main>
    <div class="shop-container container">
      <div id="sidebar1" class="sidebar" aria-label="cart-sidebar">
        <div class="sidebar__content">
          <DrawerHead :totalItems="totalItems" />

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
