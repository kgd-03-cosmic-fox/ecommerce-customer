<template>
    <div class="home-page">
      <Navbar></Navbar>
      <div class="container-fluid">
        <div class="row">
          <div class="col-2" style="background-color: #c2ccd0;  height: auto;">
            <SideBar></SideBar>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import SideBar from '../components/SideBar.vue'
export default {
  name: 'Home',
  components: {
    Navbar,
    SideBar
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('fetchProduct', { message: '' })
    } else {
      this.$router.push({ path: '/login' })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('access_token')) {
      next()
    } else {
      next('/login')
    }
  }
}
</script>
