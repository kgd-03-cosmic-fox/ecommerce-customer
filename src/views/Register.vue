<template>
  <div>
    <section id="register-section" class="container shadow-lg p-3 mb-5 rounded">
      <form @submit.prevent="register()">
        <h1 style="text-align: center">Register New User</h1>
        <div class="form-group">
          <label for="email-register" class="label">
            <h4>Email address</h4>
          </label>
          <input
            type="email"
            class="form-control"
            id="email-register"
            v-model="user.email"
          />
        </div>
        <div class="form-group">
          <label for="pass-register">
            <h4>Password</h4>
          </label>
          <input
            type="password"
            class="form-control"
            id="pass-register"
            v-model="user.password"
          />
        </div>
        <div class="row justify-content-around mx-5">
          <router-link to="/">
            <button class="btn btn-secondary btn-lg">Back</button>
          </router-link>
          <button type="submit" class="btn btn-primary btn-lg">register</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import cmsAPI from '../api/cms-api.js'
export default {
  name: 'registerPage',
  components: {},
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      cmsAPI({
        method: 'POST',
        url: '/register',
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .then(({ data }) => {})
        .catch((err) => {
          this.$store.commit('UPDATE_ERROR_MESSAGE', err.response.data.message)
        })
    }
  }
}
</script>

<style>
</style>
