<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import { useFavoriteStore } from '../../store/favoriteStore'
import { useCartStore } from '../../store/cartStore'
import heartIcon from '/img/heartIcon.svg'
import filledHeartIcon from '/img/filledHeartIcon.svg'
import shoppingCartIcon from '/img/shoppingCartIcon.svg'
import filledShoppingCartIcon from '/img/filledShoppingCartIcon.svg'
import {RouteNames} from "../../route/router";
import {CardProps} from "@/types/product";


const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const props = defineProps<CardProps>()

const discountPrice = computed<number>(() =>
    Number((props.price * (1 - (props.discountPercent ?? 0) / 100)).toFixed(2))
)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
const addIsDisabled = computed(() => props.itemsInStock === 0)
</script>
<template>
  <div class="shop-item">
    <div class="shop-item__image">
      <img class="shop-img" :src="image" :alt="props.title" />

      <button :disabled="addIsDisabled" class="add-cart__mobile" @click="cartStore.toggleCart(props, 1)">
        {{ cartStore.isInCart(props) ? 'remove from cart' : 'add to cart' }}
      </button>
      <router-link :to="{ name: RouteNames.Product, params: { id: props.documentId } }" @click="scrollToTop">
        <div class="mobile__link"></div>
      </router-link>
      <div class="icons">
        <button class="add-cart" :disabled="addIsDisabled" @click="cartStore.toggleCart(props, 1)">
          <img
            :src="cartStore.isInCart(props) ? filledShoppingCartIcon : shoppingCartIcon"
            class="cart-img"
            alt="Add to cart"
          />
        </button>

        <router-link :to="{ name: RouteNames.Product, params: { id: props.documentId } }" @click.native="scrollToTop">
          <button class="view-product">
            <img src="/img/eye.svg" alt="Open product" />
          </button>
        </router-link>
        <button class="favourite-product">
          <img
            @click="favoriteStore.toggleFavorite(props.documentId)"
            :src="favoriteStore.isFavorite(props.documentId) ? filledHeartIcon : heartIcon"
            alt="Add to favourites"
          />
        </button>
      </div>
    </div>
    <div v-if="props.itemsInStock == 0" class="item-discount">
      <p>sold out</p>
    </div>
    <div v-else>
      <div v-if="discountPercent && discountPercent !== 0" class="item-discount">
        <p>-{{ discountPercent }}%</p>
      </div>
    </div>

    <div class="shop-item__content">
      <div class="shop-item__title">
        {{ title }}
      </div>
      <div class="shop-item__price">
        <span v-if="discountPercent && discountPercent !== 0" class="shop-item__price sale">$ {{ price }}</span
        >$ {{ discountPrice }}
      </div>
    </div>
  </div>
</template>
<style src="./card.scss" lang="scss"></style>
