<script setup lang="ts">
import CartHead from '../cart-head/cart-head.vue'
import CartItemList from '../cart-list/cart-Item-list.vue'
import InfoBlock from '../info-block/info-block.vue'
import { computed, ref} from 'vue'


import { useCartStore } from '../../store/cartStore'

const cartStore = useCartStore()
export interface CartProps{
  totalPrice: number,
      buttonDisabled: boolean,
      totalItems: number,
}
const props = defineProps<CartProps>()
const totalItems= ref<number>(0)
const isCreating = ref<boolean>(false)
const cartIsEmpty = computed<boolean>(() => cartStore.cart.length === 0)

const buttonDisabled = computed<boolean>(() => isCreating.value || cartIsEmpty.value)

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
          <CartHead :totalItems="props.totalItems" />

          <div v-if="!props.totalPrice" class="items-container">
            <InfoBlock title="Корзина пустая" description="Добавьте товары в корзину" imageUrl="img/package-icon.png" />
          </div>
          <CartItemList />
        </div>
        <div class="sidebar__content sidebar-footer">
          <div class="subtotal-container">
            <div class="subtotal">Subtotal ( {{ props.totalItems }} items)</div>
            <div class="total">$ {{ props.totalPrice }}</div>
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
