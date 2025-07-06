import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const totalItems = computed(() => cart.value.reduce((acc, cur) => acc + cur.quantity, 0))
    const cart = ref([])
    const drawerOpen = ref(false)
    const burgerOpen = ref(false)
    const isInCart = ref(false)
    const closeDrawer = () => {
      drawerOpen.value = false
    }
    const totalPrice = computed(() =>
      cart.value.reduce(
        (acc, cur) => acc + Math.round(cur.price * (1 - cur.discountPercent / 100)).toFixed(2) * cur.quantity,
        0,
      ),
    )
    const openDrawer = () => {
      drawerOpen.value = true
    }

    const burgerMenuOpen = () => {
      burgerOpen.value = true
    }
    const closeBurger = () => {
      burgerOpen.value = false
    }

    const addToCart = (item) => {
      cart.value.push({ ...item, quantity: 1 })

    }


    const removeFromCart = (item) => {
      const index = cart.value.findIndex((i) => i.id === item.id)
      if (index !== -1) {
        cart.value.splice(index, 1)
      }
    }
    const toggleCart = (item) => {
      const existingItem = cart.value.find((i) => i.id === item.id)
      if (existingItem) {
        removeFromCart(existingItem)
        isInCart.value = false
      } else {
        addToCart(item)
        isInCart.value = true
      }
    }

    const changeItemQuantity = (productId, newQuantity) => {
      const item = cart.value.find((i) => i.id === productId)
      if (item) {
        item.quantity = newQuantity
        console.log(`Обновлено: Товар ${productId} — количество ${newQuantity}`)
        localStorage.setItem('cart', JSON.stringify(cart.value))
      }
    }

    watch(
      cart,
      () => {
        localStorage.setItem('cart', JSON.stringify(cart.value))
      },
      { deep: true },
    )
    return {
      cart,
      totalPrice,
      totalItems,
      drawerOpen,
      burgerOpen,
      closeDrawer,
      openDrawer,
      burgerMenuOpen,
      closeBurger,
      addToCart,
      removeFromCart,
      changeItemQuantity,
      toggleCart,
      isInCart,
    }
  },
  { persist: true },
)
