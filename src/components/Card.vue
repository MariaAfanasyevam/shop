<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  discountPercent: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function,
  productId: Number,
})
const image1 = '/public/img/heart.svg'
const image2 = '/public/img/heartclick.svg'
const currentImage = ref(image1)

function toggleImage() {
  currentImage.value = currentImage.value === image1 ? image2 : image1
}

const image3 = '/public/img/shopping-cart.svg'
const image4 = '/public/img/shopping-cart-color.svg'
const currentCartImage = ref(image3)

function toggleCartImage() {
  currentCartImage.value = currentCartImage.value === image3 ? image4 : image3
}
const discountPrice = computed(() => Math.round(props.price * (1 - props.discountPercent / 100)).toFixed(2))
</script>
<template>
  <div class="shop-item">
    <div class="shop-item__image">
      <img class="shop-img" :src="imageUrl" alt="sneakers" />
      <div class="add-cart__mobile">add to cart</div>
      <div class="icons">
        <button class="add-cart">
          <img
            @click="
              () => {
                toggleCartImage()
                onClickAdd()
              }
            "
            :src="currentCartImage"
            class="cart-img"
            alt="Add to cart"
          />
        </button>
        <router-link :to="{ name: 'Product', params: { id: props.productId } }"
          ><button class="view-product"><img src="/public/img/eye.svg" alt="Open product" /></button
        ></router-link>
        <button class="favourite-product">
          <img
            @click="
              () => {
                toggleImage()
                onClickFavorite()
              }
            "
            :src="currentImage"
            alt="Add to favourites"
          />
        </button>
      </div>
    </div>

    <div v-if="!discountPercent == 0" class="item-discount">
      <p>-{{ discountPercent }}%</p>
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
