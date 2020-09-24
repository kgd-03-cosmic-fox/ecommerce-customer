<template>
  <section id="navbar-section">
    <nav class="navbar navbar-expand-lg navbar-light bg-light row">
      <h2 class="navbar-brand col-3 ml-2">
       <router-link to="/Home">Backspace Computer</router-link>
        </h2>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <h5 class="nav-link"></h5>
        </li>
        <li class="nav-item">
        </li>
      </ul>
      <div class="col-4">
        <NavLoggedIn v-if="user !== null"></NavLoggedIn>
        <NavNotLoggedIn v-else></NavNotLoggedIn>
      </div>
    </nav>
  </section>
</template>

<script>
import NavLoggedIn from './NavLoggedIn.vue'
import NavNotLoggedIn from './NavNotLoggedIn.vue'
export default {
  components: { NavLoggedIn, NavNotLoggedIn },
  methods: {},
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>
</style>
