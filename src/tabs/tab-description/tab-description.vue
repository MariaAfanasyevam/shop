<script setup>

defineProps({
  productDescription: String,
})

</script>
<template>
  <div class="product__description">
    {{ productDescription  }}
  </div>
</template>

<style src="./tab-description.scss" lang="scss" scoped></style>
