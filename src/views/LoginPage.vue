<template>
    <div class="login-page">
        <div class="login-box-center p-2">
          <div class="login-left-side">
              <form @submit.prevent='login' class="mb-4">
                  <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input v-model='user.email' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input v-model='user.password' type="password" class="form-control" id="exampleInputPassword1">
                      <div style="height: 35px">
                        <div v-if="notification.show" class="alert alert-danger p-0 m-2" role="alert" style="text-align:center">{{notification.message}}</div>
                      </div>
                  </div>
                  <div id="buttons-loginpage">
                    <button type="submit" class="btn btn-primary" style="width: 35%">Submit</button><br>
                  </div>
              </form>
              <button @click="toRegisterPage" class="btn btn-warning" style="width: 35%">Register</button><br>
            </div>
            <div class="login-right-side">
                <img src="../assets/img/spilled-coffee-mug.png" style="width:65px" alt="">
                <h1 class="text-logo">Welcome to Kobaja.id!</h1>
            </div>
        </div>
    </div>
</template>

<script>
import KobajaApi from '../api/kobajaApi'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    notification () {
      return this.$store.state.notification
    }
  },
  methods: {
    login () {
      KobajaApi({
        url: '/login',
        method: 'POST',
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.token)
          localStorage.setItem('user_name', data.name)
          this.$store.dispatch('fetchUserName', data.name)
          this.$router.push({ name: 'Home' })
        })
        .catch(() => {
          this.$store.commit('SET_NOTIFICATION', { message: 'Invalid email/password', show: true })
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', { message: '', show: false })
          }, 5000)
        })
    },
    toRegisterPage () {
      this.$router.push({ name: 'RegisterPage' })
    }
  }
}
</script>

<style>
#buttons-loginpage{
  display: flex;;
  flex-direction: row;
  justify-content: space-between;
}

</style>
