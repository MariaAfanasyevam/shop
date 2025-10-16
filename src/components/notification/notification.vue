<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useCartStore } from '../../store/cartStore'

const cartStore = useCartStore()

interface Props {
  message: string
  show: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{(event: 'update:show', value: boolean): void}>()
const visible = ref<boolean>(props.show)
let timeout :ReturnType<typeof setTimeout> | undefined

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
