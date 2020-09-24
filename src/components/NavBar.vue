<template>
  <nav class="navbar p-1 navbar-expand-lg navbar-options p-1">
    <div class="left-side-text-navbar">
        <img class="logoEcommerce" src="../assets/img/spilled-coffee-mug.png" alt="" style="width:35px">
        <router-link class="navbar-text-logo text-reset" to="/">KOBAJA.id</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link class="nav-link text-reset" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link text-reset" to="/category">Categories</router-link>
            </li>
        </ul>
    </div>
    <div class="right-side-text-navbar my-2 my-lg-2" style="height:50%">
         <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link class="nav-link text-reset" to="/checkout">
                  <img src="../assets/img/shopping-cart.svg" alt="" style="width:35px">
                </router-link>
            </li>
        </ul>
        <button @click="logout" class="btn btn-outline-danger my-2 my-sm-0 text-reset nav-link">Logout</button>
    </div>
</nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'LoginPage' })
    }
  }
}
</script>

<style>

</style>
