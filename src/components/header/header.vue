<script setup lang="ts">
import { useCartStore } from '../../store/cartStore'
import { ref } from 'vue'
import BurgerMenu from '../burger-menu/burger-menu.vue'
import CartIcon from '../../icons/cart-icon.vue'
import UserIcon from '../../icons/user-icon.vue'
const cartStore = useCartStore()
const burgerOpen = ref(false)


const props=defineProps<{totalItems: Number}>()

const burgerClose = () => {
  burgerOpen.value = false
  document.body.style.overflow = burgerOpen.value ? 'hidden' : ''
}

const toggleBurger = () => {
  burgerOpen.value = !burgerOpen.value
  document.body.style.overflow = burgerOpen.value ? 'hidden' : ''
}
</script>
<template>
  <header class="container">
    <div class="header">
      <div class="logo">
        <router-link to="/">
          <h1 class="title">Shoppe</h1>
        </router-link>
      </div>
      <div class="menu">
        <nav class="nav">
          <ul class="nav__ul text">
            <li class="nav__li">
              <div class="nav__li_wrapper"><router-link to="/shop">Shop</router-link></div>
            </li>
          </ul>
          <ul class="nav__ul icon-header">
            <li class="nav__li" aria-label="cart">

                <div class="nav__cart-items" @click="cartStore.openDrawer()">
                    <CartIcon />
                  <span class="cart-items" v-if="props.totalItems" id="cart-total">{{ props.totalItems }}</span>

              </div>
            </li>
            <li class="nav__li">
              <div class="nav__li_wrapper">
                <UserIcon />
              </div>
            </li>
          </ul>
          <div class="burger-menu">
            <div class="burger-menu__icon">
              <button id="burger" class="burger" :class="{ active: burgerOpen }" @click="toggleBurger">
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


<style src="./header.scss" lang="scss" scoped></style>
