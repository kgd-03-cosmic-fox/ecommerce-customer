<template>
    <div class="register-page">
        <div class="register-box-center p-5">
          <div style="width:50%">
              <form @submit.prevent='register' class="mb-4">
                  <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input v-model='user.name' type="text" class="form-control" aria-describedby="emailHelp" placeholder="Your name">
                  </div>
                  <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input v-model='user.email' type="email" class="form-control" aria-describedby="emailHelp" placeholder="youremail@mail.com">
                      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input v-model='user.password' type="password" class="form-control" id="exampleInputPassword1">
                  </div>
                  <div class="form-group">
                      <label for="exampleInputPassword2">Confirm Password</label>
                      <input v-model='user.confirmPassword' type="password" class="form-control" id="exampleInputPassword2">
                      <div style="height: 35px">
                        <div v-if="notification.show" :class="notification.color" role="alert" style="text-align:center">{{notification.message}}</div>
                      </div>
                  </div>
                  <div id="buttons-register-page">
                    <button class="btn btn-warning" style="width: 35%">Register</button><br>
                  </div>
              </form>
            </div>
        </div>
    </div>
</template>

<script>
import KobajaApi from '../api/kobajaApi'

export default {
  name: 'RegisterPage',
  data () {
    return {
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    notification () {
      return this.$store.state.notification
    }
  },
  methods: {
    register () {
      if (this.user.password === this.user.confirmPassword) {
        KobajaApi({
          url: '/register',
          method: 'POST',
          data: {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
          }
        })
          .then(({ data }) => {
            this.$store.commit('SET_NOTIFICATION', { message: data.message, show: true, color: 'alert alert-success' })
            setTimeout(() => {
              this.$router.push({ name: 'LoginPage' })
              this.$store.commit('SET_NOTIFICATION', { message: '', show: false, color: '' })
            }, 3000)
          })
          .catch((error) => {
            this.$store.commit('SET_NOTIFICATION', { message: error.response.data.errors[0], show: true, color: 'alert alert-danger' })
          })
      } else {
        console.log('password didnt match')
        this.$store.commit('SET_NOTIFICATION', { message: "password didn't match", show: true })
        setTimeout(() => {
          this.$store.commit('SET_NOTIFICATION', { message: '', show: false })
        }, 3000)
      }
    }
  }
}
</script>

<style>
#buttons-register-page{
  display: flex;;
  flex-direction: row;
  justify-content: space-between;
}
</style>
