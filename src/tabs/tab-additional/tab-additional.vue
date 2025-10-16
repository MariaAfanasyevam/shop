<script setup lang="ts">
interface ProductInformation {
  weight: number
  dimensions: string
  color: string
  material: string
}

const props = defineProps<{
  productInformation: ProductInformation
}>()

</script>
<template>
  <div class="additional__description">
    <p><span class="description__category">Weight:</span> {{ productInformation.weight }} kg</p>
    <p><span class="description__category">Dimensions:</span> {{ productInformation.dimensions }} cm</p>
    <p><span class="description__category">Colours:</span> {{ productInformation.color }}</p>
    <p><span class="description__category">Material:</span> {{ productInformation.material }}</p>
  </div>
</template>

<style src="./tab-additional.scss" lang="scss" scoped></style>
