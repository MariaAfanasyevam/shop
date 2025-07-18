<script setup>
import { useCartStore } from '../store/cartStore'
import { ref } from 'vue'
import BurgerMenu from './burger-menu.vue'
import CartIcon from '../icons/cart-icon.vue'
import UserIcon from '../icons/user-icon.vue'
const cartStore = useCartStore()
defineProps({
  totalItems: Number,
})
const burgerOpen = ref(false)
</script>
<template>
  <header class="container">
    <div class="header  underline">
      <div class="logo">
        <!--        <a class="logo__link" title="Home" href="index.html">-->
        <router-link to="/">
          <h1 class="title">Shoppe</h1>
        </router-link>
        <!--        </a>-->
      </div>
      <div class="menu ">
        <nav class="nav">
          <ul class="nav__ul text">
            <router-link to="/shop">
              <li class="nav__li">Shop</li>
            </router-link>
          </ul>
          <ul class="nav__ul icon">
            <div class="cart" aria-label="cart">
              <li class="nav__li" @click="cartStore.openDrawer()">
                <a href="#" class="nav__link">
                 <CartIcon/></a>
                <span class="cart-items" v-if="totalItems" id="cart-total">{{ totalItems }}</span>
              </li>
            </div>
            <li class="nav__li">
              <router-link to="/profile">
                <UserIcon/>
              </router-link>
            </li>
          </ul>
          <div class="burger-menu">
            <div class="burger-menu__icon">
              <button
                id="burger"
                class="burger"
                :class="{active : burgerOpen}"
                @click="
                  () => {
                    burgerOpen = !burgerOpen
                  }
                "
              >
                <span v-if="!burgerOpen"></span>
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
  <BurgerMenu v-if="burgerOpen" />
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
