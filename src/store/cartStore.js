import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { useCardStore } from './cardStore.js'

export const useCartStore = defineStore(
  'cart',
  () => {
    const totalItems = computed(() => cart.value.reduce((acc, cur) => acc + cur.quantity, 0))
    const cart = ref([])
    const drawerOpen = ref(false)
    // const burgerOpen = ref(false)
    const closeDrawer = () => {
      drawerOpen.value = false
    }
    const notification = ref({ show: false, message: '' })

    const totalPrice = computed(() =>
      cart.value.reduce(
        (acc, cur) => acc + Math.round(cur.price * (1 - cur.discountPercent / 100)).toFixed(2) * cur.quantity,
        0,
      ),
    )

    const openDrawer = () => {
      drawerOpen.value = true
    }

    const addToCart = (item) => {
      cart.value.push({ ...item, quantity: 1 })
      showNotification(`${item.title} added to your Shopping bag!`)
    }
    const showNotification = (message) => {
      notification.value = { show: true, message }
      setTimeout(() => {
        notification.value.show = false
      }, 3000)
    }

    function isInCart(product) {
      return cart.value.some((item) => item.id === product.id)
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
      } else {
        addToCart(item)
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

    return {
      cart,
      totalPrice,
      totalItems,
      drawerOpen,
      closeDrawer,
      openDrawer,
      addToCart,
      removeFromCart,
      changeItemQuantity,
      toggleCart,
      isInCart,
      notification,
      showNotification
    }
  },
  { persist: true },
)
