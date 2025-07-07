<script setup>
import { computed, ref } from 'vue'
import { useFavoriteStore } from '../store/favoriteStore.js'
import { useCardStore } from '../store/cardStore.js'
import { useCartStore } from '../store/cartStore.js'

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const props = defineProps({
  id: Number,
  title: String,
  image: String,
  price: Number,
  discountPercent: Number,
  productId: String
})
const image1 = '/img/heart.svg'
const image2 = '/img/heartclick.svg'

const image3 = '/img/shopping-cart.svg'
const image4 = '/img/shopping-cart-color.svg'


const discountPrice = computed(() => Math.round(props.price * (1 - props.discountPercent / 100)).toFixed(2))
</script>
<template>
  <div class="shop-item">
    <div class="shop-item__image">
      <img class="shop-img" :src="image" :alt="props.title" />
      <div class="add-cart__mobile">add to cart</div>
      <div class="icons">
        <button class="add-cart">
          <img
            @click="cartStore.toggleCart(props)"
            :src="cartStore.isInCart(props) ? image4 : image3"
            class="cart-img"
            alt="Add to cart"
          />
        </button>

        <router-link :to="{ name: 'Product', params: { id: props.productId } }" v-slot="{ navigate }">
          <button class="view-product" @click="navigate()">
            <img src="/img/eye.svg" alt="Open product" />
          </button>
        </router-link>
        <button class="favourite-product">
          <img
            @click="favoriteStore.toggleFavorite(props.productId)"
            :src="favoriteStore.isFavorite(props.productId) ? image2 : image1"
            alt="Add to favourites"
          />
        </button>
      </div>
    </div>
    <div v-if="props.itemsInStock == 0" class="item-discount">
      <p>sold out</p>
    </div>
    <div v-else>
      <div v-if="!discountPercent == 0" class="item-discount">
        <p>-{{ discountPercent }}%</p>
      </div>
    </div>

    <div class="shop-item__content">
      <div class="shop-item__title">
        {{ title }}
      </div>
      <div class="shop-item__price">
        <span v-if="!discountPercent == 0" class="shop-item__price sale">$ {{ price }}</span
        >$ {{ discountPrice }}
      </div>
    </div>
  </div>
</template>
