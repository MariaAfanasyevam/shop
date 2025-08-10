import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const totalItems = computed(() => cart.value.reduce((acc, cur) => acc + cur.quantity, 0))
    const cart = ref([])
    const drawerOpen = ref(false)
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

    const addToCart = (item, quantity) => {
      cart.value.push({ ...item, quantity: quantity })
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
    const toggleCart = (item, quantity) => {
      const existingItem = cart.value.find((i) => i.id === item.id)
      if (existingItem) {
        removeFromCart(existingItem)
      } else {
        addToCart(item, quantity)
      }
    }

    const changeItemQuantity = (productId, newQuantity) => {
      const item = cart.value.find((i) => i.id === productId)
      if (item) {
        item.quantity = newQuantity
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
      showNotification,
    }
  },
  { persist: true },
)
