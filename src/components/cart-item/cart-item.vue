<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCartStore, CartItem } from '../../store/cartStore'

const cartStore = useCartStore()
const props = defineProps<CartItem>()


const increaseIsDisabled = computed(() => props.quantity >= props.itemsInStock)
const decreaseIsDisabled = computed(() => props.quantity <= 1)
const discountPrice = computed(() => Math.round(props.price * (1 - props.discountPercent / 100)).toFixed(2))


</script>
<template>
  <li class="item-container">
    <img :src="image" :alt="title" class="cart-img" />

    <div class="item-content">
      <h1>{{ title }}</h1>
      <div class="item-color">{{ color }} / Medium</div>
      <p class="item-price">
        <span class="cart-item__price sale" v-if="Number(discountPercent) !== 0">$ {{ price }}</span
        ><span> $ {{ discountPrice }}</span>
      </p>

      <div class="item-quantity">
        <span>QTY:</span>
        <button class="remove-item" :disabled="decreaseIsDisabled" @click="cartStore.changeItemQuantity(props.id, props.quantity-1)">-</button>
        <span class="item-timer">{{ props.quantity }}</span>
        <button class="add-item" :disabled="increaseIsDisabled" @click="cartStore.changeItemQuantity(props.id, props.quantity+1)">+</button>
      </div>
    </div>

    <button class="delete-button">
      <img @click="cartStore.removeFromCart(props)" src="/img/delete.svg" alt="delete" />
    </button>
  </li>
</template>
<style src="./cart-item.scss" lang="scss"></style>