<template>
  <div class="text-center login-page">
        <div class="form-login">
          <b-alert variant="danger" show v-if="errorMessage">{{errorMessage}}</b-alert>
            <h1>Login</h1>
            <form method="post">
              <div>
                <input type="text"
                name="email"
                id="email"
                v-model="email"
                placeholder="Your Email...">
              </div>
              <div>
                <input type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="Your Password...">
              </div>
              <div>
                <p class="register-text">
                  Don't have account yet?
                  <br>
                  <a href="#" v-on:click.prevent="register"> <u>Register Here</u></a>
                </p>
              </div>
              <div>
                <button type="button"
                class="btn btn-primary btn-login"
                v-on:click="Login"
                >
                Login
                </button>
              </div>
            </form>
        </div>
  </div>
</template>

<script>
import ProductApi from '../api/ProductApi'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    Login () {
      ProductApi({
        method: 'post',
        url: '/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$store.dispatch('fetchDataProduct')
          this.$store.commit('SET_STATUS_LOGIN', true)
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          this.$store.commit('SET_MESSAGE_ERROR', err.response.data.message)
          this.deleteNotif()
        })
    },
    deleteNotif () {
      setTimeout(() => {
        this.$store.commit('SET_MESSAGE_ERROR', '')
      }, 3500)
    },
    register () {
      this.$router.push({ name: 'Register' })
    }
  },
  computed: {
    errorMessage () {
      return this.$store.state.errorMessage
    }
  },
  created () {
    this.$store.commit('SET_MESSAGE_ERROR', '')
    this.$store.commit('SET_MESSAGE_SUCCESS', '')
  },
  beforeRouteEnter (to, from, next) {
    
  }
}
</script>

<style>

</style>
