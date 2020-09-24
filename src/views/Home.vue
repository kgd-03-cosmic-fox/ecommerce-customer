<template>
  <div class="home">
    <NavBar/>
    <div v-if="notification.show" :class="notification.color" role="alert">
  {{notification.message}}
</div>
    <h1>Selamat datang, {{name}} </h1>
    <Products
    ></Products>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import Products from '../components/Products.vue'

export default {
  name: 'Home',
  components: {
    NavBar, Products
  },
  computed: {
    name () {
      return this.$store.state.user.name
    },
    products () {
      return this.$store.state.products
    },
    notification () {
      return this.$store.state.notification
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('access_token')) {
      next()
    } else {
      next('/login')
    }
  },
  created () {
    this.$store.dispatch('fetchUserName', localStorage.getItem('user_name'))
    this.$store.dispatch('fetchDataProducts')
  }
}
</script>
