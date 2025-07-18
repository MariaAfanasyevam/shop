<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
})
</script>
<template>
  <div class="text-center">
    <img style="height: 80px; width: 80px" src="/img/package-icon.png" :alt="description" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
