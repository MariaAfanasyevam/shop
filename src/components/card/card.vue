<script setup>
import { computed, ref, shallowRef } from 'vue'
import { useFavoriteStore } from '../../store/favoriteStore.js'
import { useCartStore } from '../../store/cartStore.js'
import heartIcon from '/img/heartIcon.svg'
import  filledHeartIcon   from '/img/filledHeartIcon.svg'
import  shoppingCartIcon  from '/img/shoppingCartIcon.svg'
import filledShoppingCartIcon from '/img/filledShoppingCartIcon.svg'
import debounce from 'lodash.debounce'

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const props = defineProps({
  id: Number,
  title: String,
  image: String,
  price: Number,
  discountPercent: Number,
  productId: String,
  itemsInStock: Number,
})

const discountPrice = computed(() => Math.round(props.price * (1 - props.discountPercent / 100)).toFixed(2))

const handleProductClick = (navigate) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

}
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

</script>
<template>
  <div class="shop-item">
    <div class="shop-item__image">
      <img class="shop-img" :src="image" :alt="props.title" />
      <div class="add-cart__mobile" @click="cartStore.toggleCart(props,1)">
        {{ cartStore.isInCart(props) ? 'remove from cart' : 'add to cart' }}
      </div>
      <div class="icons">
        <button class="add-cart">
          <img
            @click="cartStore.toggleCart(props,1)"
            :src="cartStore.isInCart(props) ? filledShoppingCartIcon : shoppingCartIcon"
            class="cart-img"
            alt="Add to cart"
          />
        </button>

        <router-link :to="{ name: 'Product', params: { id: props.productId } }"   @click.native="scrollToTop">
          <button class="view-product" >
            <img src="/img/eye.svg" alt="Open product" />
          </button>
        </router-link>
        <button class="favourite-product">
          <img
            @click="favoriteStore.toggleFavorite(props.productId)"
            :src="favoriteStore.isFavorite(props.productId) ? filledHeartIcon : heartIcon"
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
<style src="./card.scss" lang="scss"></style>
