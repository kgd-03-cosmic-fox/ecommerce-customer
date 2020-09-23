<template>
  <div id="app">
    <NavBar v-show="loginStatus" class="navbar"></NavBar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  components: {
    NavBar
  },
  computed: {
    loginStatus () {
      return this.$store.state.statusLogin
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.dispatch('fetchDataProduct')
      this.$store.commit('SET_STATUS_LOGIN', true)
      this.$router.push({ name: 'Home' })
    } else {
      this.$store.commit('SET_STATUS_LOGIN', false)
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
