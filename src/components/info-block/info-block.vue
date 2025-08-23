<script setup lang="ts">
interface Props {
  title: string
  description: string
  imageUrl: string
}
const props = defineProps<Props>()
</script>
<template>
  <div>
    <img class="info-block__img" :src="imageUrl" :alt="description" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<style src="./info-block.scss" lang="scss" scoped></style>
