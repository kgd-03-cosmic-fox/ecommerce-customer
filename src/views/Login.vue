<template>
  <div class="login-page">
    <div class="login-box p-5">
      <h1 style="text-align: center;">Login</h1>
      <form class="mb-5">
          <label for="name">Email: </label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">@</span>
            </div>
            <input v-model="user.email" type="text" class="form-control" placeholder="Username" aria-label="Email" aria-describedby="basic-addon1">
          </div>
          <label for="name">Password: </label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">*</span>
            </div>
            <input v-model="user.password" type="password" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="form-item">
            <div class="alert alert-danger" role="alert" v-if="this.user.notif">
              {{ this.user.notif }}
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
            <br>
            Didn  't Have Account? <router-link to="/register">Sign Up</router-link>
          </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: '',
        notif: ''
      }
    }
  },
  methods: {
    login () {
      axios({
        method: 'POST',
        url: 'http://localhost:3007/customer/login',
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          this.user.notif = err.response.data.message
          setTimeout(() => {
            this.user.notif = ''
          }, 3000)
        })
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('fetchProduct', { message: '' })
    } else {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
