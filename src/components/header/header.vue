<script setup>
import { useCartStore } from '../../store/cartStore'
import { ref } from 'vue'
import BurgerMenu from '../burger-menu/burger-menu.vue'
import CartIcon from '../../icons/cart-icon.vue'
import UserIcon from '../../icons/user-icon.vue'
const cartStore = useCartStore()
const burgerOpen = ref(false)
defineProps({
  totalItems: Number,
})
const burgerClose = () => {
  burgerOpen.value = false
  document.body.classList.toggle('no-scroll')
}

const toggleBurger = () => {
  burgerOpen.value = !burgerOpen.value
  document.body.classList.toggle('no-scroll')
}
</script>
<template>
  <header class="container">
    <div class="header underline">
      <div class="logo">
        <router-link to="/">
          <h1 class="title">Shoppe</h1>
        </router-link>
      </div>
      <div class="menu">
        <nav class="nav">
          <ul class="nav__ul text">
            <router-link to="/shop">
              <li class="nav__li">Shop</li>
            </router-link>
          </ul>
          <ul class="nav__ul icon">
            <li class="cart" aria-label="cart">
              <div class="nav__li" @click="cartStore.openDrawer()">
                <a href="#" class="nav__link"> <CartIcon /></a>
                <div class="cart-items" v-if="totalItems" id="cart-total">{{ totalItems }}</div>
              </div>
            </li>
            <li class="nav__li">
              <UserIcon />
            </li>
          </ul>
          <div class="burger-menu">
            <div class="burger-menu__icon">
              <button
                id="burger"
                class="burger"
                :class="{ active: burgerOpen }"
                @click="toggleBurger"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
  <BurgerMenu v-if="burgerOpen" @burger-close="burgerClose" />
</template>

<script>
export default {}
</script>

<style src="./header.scss" lang="scss" scoped></style>
