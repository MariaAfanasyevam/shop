<script setup>
import CartHead from '../cart-head/cart-head.vue'
import CartItemList from '../cart-list/cart-Item-list.vue'
import InfoBlock from '../info-block/info-block.vue'
import { computed, ref} from 'vue'


import { useCartStore } from '../../store/cartStore'

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
      <Transition name="fade">
      <div
        class="overlay"
        v-if="cartStore.drawerOpen"
        @click="cartStore.closeDrawer"
      ></div>
      </Transition>
      <Transition name="slide-cart">
      <div class="sidebar" aria-label="cart-sidebar" v-if="cartStore.drawerOpen">
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
      </Transition>
      </div>
  </main>
</template>
<style src="./cart.scss" lang="scss" scoped></style>
