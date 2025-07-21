<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useProductStore } from '../store/productStore.js'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const author = ref('')
const reviewText = ref('')
const rating = ref(5)

const saveInfo = ref(false)
const { request, reviewsCount, productReviews, averageRating } = storeToRefs(productStore)

const submitReview = async () => {
  if (!author.value || !reviewText.value || !rating.value) {
    alert('Заполните все поля')
    return
  }
  try {
    const response = await axios.post(
      `https://api.dev.cwe.su/api/reviews/`,
      {
        data: {
          author: author.value,
          text: reviewText.value,
          rate: rating.value,
          product: productStore.request.documentId,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response.data)
    reviewText.value = ''
    author.value = ''
    rating.value = 5
    productStore.fetchReviews(productStore.request.documentId)
    console.log(productStore.request.documentId)
  } catch (error) {
    console.error('Ошибка при отправке отзыва:', error)
  }
}
</script>
<template>
  <div class="reviews__block">
    <div class="reviews__list">
      <div class="reviews__title">
        <h1>{{ productStore.productReviews.length }} Reviews for {{ request.title }}</h1>
      </div>
      <div v-if="reviewsCount != 0">
        <div class="review__items" v-for="productReview in productReviews">
          <h2>{{ productReview.author }}:</h2>
          <div class="rate">
            <div class="stars">
              <template v-for="i in 5" :key="i">
                <img v-if="productReview.rate >= i" src="/img/star.svg" alt="full" class="star" />
                <img v-else src="/img/star-outline.svg" alt="empty" class="star" />
              </template>
            </div>
          </div>
          <div class="reviews__text">
            <p>{{ productReview.text }}</p>
          </div>
        </div>
        <br />
      </div>
      <p v-else>No reviews</p>
    </div>
    <div class="review__form">
      <h1>Add a Review</h1>
      <div class="add-review__text">
        <div class="review-title">Required fields are marked *</div>

        <form @submit="submitReview">
          <div class="form-field">
            <label>Your Review<sup>*</sup></label>
            <input type="text" id="review" v-model="reviewText" />
          </div>
          <div class="form-field">
            <label>Enter your name<sup>*</sup></label>
            <input type="text" id="name" v-model="author" />
          </div>
          <div class="form-field">
            <label>
              <input type="checkbox" v-model="saveInfo" />Save my name, and website in this browser for the next time I
              comment
            </label>
          </div>
          <div class="form-field">
            <div class="rating-label">Your Rating<sup>*</sup></div>

            <div class="rating">
              <template v-for="i in 5" :key="i">
                <img
                  :src="i <= rating ? '/img/star.svg' : '/img/star-outline.svg'"
                  alt="empty"
                  class="star"
                  @click="rating = i"
                />
              </template>
            </div>
          </div>
          <div class="form-field">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style src="../pages/productPage/product.scss" lang="scss" scoped></style>
