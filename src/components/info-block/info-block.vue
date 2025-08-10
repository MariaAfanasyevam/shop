<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
})
</script>
<template>
  <div>
    <img class="info-block__img" src="/img/package-icon.png" :alt="description" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<style src="./info-block.scss" lang="scss" scoped></style>
