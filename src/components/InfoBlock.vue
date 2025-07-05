<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
})
</script>
<template>
  <div class="text-center">
    <img height="80" width="80" src="/img/package-icon.png" :alt="description" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
