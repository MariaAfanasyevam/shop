<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useCartStore } from '../../store/cartStore.js'

const cartStore = useCartStore()
const props = defineProps({
  message: String,
  show: Boolean,
})

const emit = defineEmits(['update:show'])
const visible = ref(props.show)
let timeout

watch(
  () => props.show,
  (val) => {
    visible.value = val
    if (val) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        close()
      }, 3000)
    }
  },
)

function close() {
  visible.value = false
  emit('update:show', false)
}
onUnmounted(() => clearTimeout(timeout))
</script>

<template>
  <transition name="fade">
    <div v-if="visible">
      <div class="notification-container notification">
        <span class="notification__text">{{ message }}</span>
        <div @click="cartStore.openDrawer()" class="view-cart">view cart</div>
      </div>
    </div>
  </transition>
</template>
<style src="./notification.scss" scoped></style>
