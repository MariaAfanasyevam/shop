<script setup>
import { useProductStore } from '../store/productStore.js'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()

const { request, reviewsCount, productReviews, averageRating } = storeToRefs(productStore)
</script>
<template>
  <div class="reviews__block">
    <div class="reviews__list">
      <div class="reviews__title">
        <h1>{{ productReviews.length }} Reviews for {{ request.title }}</h1>
      </div>
      <div v-if="reviewsCount != 0">
        <div class="review__items" v-for="productReview in productReviews">
          <h2>{{ productReview.author }}:</h2>
          <div class="rate">
            <div class="stars">
              <template v-for="i in 5" :key="i">
                <img v-if="averageRating >= i" src="/img/star.svg" alt="full" class="star" />
                <img v-else-if="averageRating >= i - 0.5" src="/img/star-half.svg" alt="half" class="star" />
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

        <form>
          <div class="form-field">
            <label>Your Review<sup>*</sup></label>
            <input type="text" id="review" />
          </div>
          <div class="form-field">
            <label>Enter your name<sup>*</sup></label>
            <input type="text" id="name" />
          </div>
          <div class="form-field">
            <label>
              <input type="checkbox" />Save my name, and website in this browser for the next time I comment
            </label>
          </div>
          <div class="form-field">
            <div class="rating-label">Your Rating<sup>*</sup></div>

            <div class="rating">
              <template v-for="i in 5" :key="i">
                <img src="/img/star-outline.svg" alt="empty" class="star" />
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

<style lang="scss" scoped></style>
