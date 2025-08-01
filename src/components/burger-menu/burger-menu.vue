<script setup>

import { useCartStore } from '../../store/cartStore'
const emit= defineEmits(['burgerClose'])

</script>
<template>
  <nav id="mobile-menu" class="burger-menu__nav">
    <div class="container">
      <ul class="burger-menu__list" @click="emit('burgerClose')">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/shop">Shop</router-link></li>
        <li>My account</li>
        <li><a href="#">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<style src="./burger-menu.scss" lang="scss" scoped></style>
