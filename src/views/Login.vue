<template>
  <div>
    <section id="login-section" class="container shadow-lg p-3 mb-5 rounded">
      <form @submit.prevent="login()">
        <h1 style="text-align: center">CMS Admin Login</h1>
        <div class="form-group">
          <label for="email-login" class="label">
            <h4>Email address</h4>
          </label>
          <input
            type="email"
            class="form-control"
            id="email-login"
            v-model="user.email"
          />
        </div>
        <div class="form-group">
          <label for="pass-login">
            <h4>Password</h4>
          </label>
          <input
            type="password"
            class="form-control"
            id="pass-login"
            v-model="user.password"
          />
        </div>
        <div class="row justify-content-around mx-5">
          <router-link to="/">
            <button class="btn btn-secondary btn-lg">Back</button>
          </router-link>
          <button type="submit" class="btn btn-primary btn-lg">Login</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import cmsAPI from '../api/cms-api.js'
export default {
  name: 'LoginPage',
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
    toRegister () {
      this.$emit('changeDisplay', 'register')
    },
    login () {
      cmsAPI({
        method: 'POST',
        url: '/login',
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$store.commit('UPDATE_ERROR_MESSAGE', null)
          this.$store.commit('USER_STATE', data.name)
          this.$router.push('/')
        })
        .catch((err) => {
          this.$store.commit('UPDATE_ERROR_MESSAGE', err.response.data.message)
        })
        .finally(() => {
          this.user.email = ''
          this.user.password = ''
        })
    }
  },
  props: [],
  created () {}
}
</script>

<style>
</style>
