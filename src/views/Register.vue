<template>
  <div class="text-center register-page">
        <div class="form-register">
          <b-alert variant="success" show v-if="successMessage">{{successMessage}}</b-alert>
          <b-alert variant="danger" show v-if="errorMessage">{{errorMessage}}</b-alert>
            <h1>Register</h1>
            <form method="post">
              <div>
                <input type="text"
                name="email"
                id="email"
                v-model="email"
                placeholder="Email...">
              </div>
              <div>
                <input type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="Password...">
              </div>
              <div>
                <p class="register-text">
                  <a href="#" v-on:click.prevent="back"> <u>Back to Login</u></a>
                </p>
              </div>
              <div>
                <button type="button"
                class="btn btn-primary btn-register"
                v-on:click="Register"
                >
                Register
                </button>
              </div>
            </form>
        </div>
  </div>
</template>

<script>
import ProductApi from '../api/ProductApi'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    Register () {
      ProductApi({
        method: 'post',
        url: '/register',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_MESSAGE_SUCCESS', data.message)
          this.redirectHome()
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
    redirectHome () {
      setTimeout(() => {
        this.$store.commit('SET_MESSAGE_SUCCESS', '')
        this.$router.push({ name: 'Login' })
      }, 2000)
    },
    back () {
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    successMessage () {
      return this.$store.state.successMessage
    },
    errorMessage () {
      return this.$store.state.errorMessage
    }
  }
}
</script>

<style>

</style>
