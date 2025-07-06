<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../store/cartStore'

const cartStore = useCartStore()

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  color: String,
  discountPrice: Number,
  discountPercent: Number,
  itemsInStock: Number,
  productId: Number,
  quantity: Number,
})
const quantity = ref(1)
const val = 1
const val1 = -1
const increaseIsDisabled = computed(() => quantity.value >= props.itemsInStock)
const decreaseIsDisabled = computed(() => quantity.value <= 1)
const discountPrice = computed(() => Math.round(props.price * (1 - props.discountPercent / 100)).toFixed(2))
</script>
<template>
  <li class="item-container">
    <img :src="imageUrl" :alt="title" class="cart-img" />

    <div class="item-content">
      <h1>{{ title }}</h1>
      <div class="item-color">{{ color }} / Medium</div>
      <p class="item-price">
        <span class="shop-item__price sale" v-if="!discountPercent == 0">$ {{ price }}</span
        ><span> $ {{ discountPrice }}</span>
      </p>

      <div class="item-quantity">
        <span>QTY:</span>
        <button
          class="remove-item"
          :disabled="decreaseIsDisabled"
          @click="
            () => {
              quantity--
              cartStore.changeItemQuantity( id, quantity)
              console.log(id, quantity)
            }
          "
        >
          -
        </button>
        <span class="item-timer">{{ quantity }}</span>
        <button
          class="add-item"
          :disabled="increaseIsDisabled"
          @click="
            () => {
              quantity++
              cartStore.changeItemQuantity( id, quantity)
              console.log(id, quantity)
            }
          "
        >
          +
        </button>
      </div>
    </div>

    <button class="delete-button">
      <img @click="cartStore.removeFromCart(props)" src="/img/delete.svg" alt="delete" />
    </button>
  </li>
</template>
