<template>
  <div>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Welcome to Backspace Computer!</h1>
        <p class="lead">
          We provide a wide selection of computer, and gaming peripherals.<br>
          Can't find what you're looking for? Send us an email and we'll see if we can get them for you!
        </p>
      </div>
    </div>
    <ContentContainer></ContentContainer>
  </div>
</template>

<script>
import ContentContainer from '../components/ContentContainer.vue'
export default {
  name: 'Home',
  components: { ContentContainer },
  computed: {
    detailComponentDisplay () {
      return this.$store.state.currentEdit
    }
  },
  created () {}
}
</script>
