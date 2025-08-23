import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
    id: number
    title: string
    image: string
    price: number
    discountPercent: number
    quantity: number
    itemsInStock: number
    color?: string
    documentId?: number | string
    discountPrice?: number
}

export const useCartStore = defineStore(
  'cart',
  () => {
      const cart = ref<CartItem[]>([])
    const drawerOpen = ref(false)
    const closeDrawer = () => {
      drawerOpen.value = false
    }
    const notification = ref<{ show: boolean; message: string }>({ show: false, message: '' })
      const totalItems= computed<number>(() => cart.value.reduce<number>((acc, cur) => acc + cur.quantity, 0))
    const totalPrice = computed<number>(() =>
      cart.value.reduce<number>(
        (acc, cur) => acc + Number((cur.price * (1 - cur.discountPercent / 100)).toFixed(2)) * cur.quantity,
        0,
      ),
    )

    const openDrawer = () => {
      drawerOpen.value = true
    }

    const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
      cart.value.push({ ...item, quantity})
      showNotification(`${item.title} added to your Shopping bag!`)
    }
    const showNotification = (message:string) => {
      notification.value = { show: true, message }
      setTimeout(() => {
        notification.value.show = false
      }, 3000)
    }

    function isInCart(product: {id: number}) {
      return cart.value.some((item) => item.id === product.id)
    }

    const removeFromCart = (item: CartItem) => {
      const index = cart.value.findIndex((i) => i.id === item.id)
      if (index !== -1) {
        cart.value.splice(index, 1)
      }
    }
    const toggleCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
      const existingItem = cart.value.find((i) => i.id === item.id)
      if (existingItem) {
        removeFromCart(existingItem)
      } else {
        addToCart(item, quantity)
      }
    }

    const changeItemQuantity = (productId: number, newQuantity:number) => {
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
