<script setup>
import InIcon from '../icons/in-icon.vue'
import FacebookIcon from '../icons/facebook-icon.vue'
import InstagramIcon from '../icons/instagram-icon.vue'
import TwitterIcon from '../icons/twitter-icon.vue'
</script>

<template>
  <footer>
    <div class="footer-container container">
      <div class="footer-social">
        <div class="footer-social__terms">© 2025 Shelly</div>
        <div class="footer-social__list">
          <ul class="footer-social__ul">
            <li class="footer-social__li">
              <a href="/" title="IN" aria-label="IN"
                >
                <InIcon/>
              </a>
            </li>
            <li>
              <a href="/" title="facebook" aria-label="facebook"
                ><FacebookIcon/></a>
            </li>
            <li>
              <a href="/" title="instagram" aria-label="instagram"
                ><InstagramIcon/></a>
            </li>
            <li>
              <a href="/" title="twitter" aria-label="twitter"
                ><TwitterIcon/></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss"></style>
