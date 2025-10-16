<script setup lang="ts">

const { productDescription } = defineProps<{
  productDescription: string
}>()

</script>
<template>
  <div class="product__description">
    {{ productDescription  }}
  </div>
</template>

<style src="./tab-description.scss" lang="scss" scoped></style>
