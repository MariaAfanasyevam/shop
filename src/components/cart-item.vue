<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../store/cartStore'

const cartStore = useCartStore()

const props = defineProps({
  id: Number,
  title: String,
  image: String,
  price: Number,
  color: String,
  discountPrice: Number,
  discountPercent: Number,
  itemsInStock: Number,
  productId: Number,
  quantity: Number
})

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
        <span class="shop-item__price sale" v-if="!discountPercent == 0">$ {{ price }}</span
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
