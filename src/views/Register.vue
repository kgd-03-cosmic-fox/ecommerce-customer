<template>
  <div class="login-page">
    <div class="login-box p-5">
      <h1 style="text-align: center;">SignUp</h1>
      <form class="mb-3">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Name</span>
          </div>
          <input v-model="user.name" type="text" class="form-control" placeholder="Nick Name" aria-label="default" aria-describedby="basic-addon1" required>
        </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">@</span>
            </div>
            <input v-model="user.email" type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" required>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">*</span>
            </div>
            <input v-model="user.password" type="password" class="form-control" placeholder="Type Your Password Here" aria-label="Default" aria-describedby="inputGroup-sizing-default" required>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">*</span>
            </div>
            <input v-model="user.retypePass" type="password" class="form-control" placeholder="Re-Type Password" aria-label="Default" aria-describedby="inputGroup-sizing-default" required>
          </div>
          <div class="form-item">
            <div class="alert alert-danger" role="alert" v-if="this.notif">
              {{ this.notif }}
            </div>
            <button type="button" class="btn btn-primary" @click.prevent="register">SignUp</button>
          </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        retypePass: ''
      },
      notif: ''
    }
  },
  methods: {
    register () {
      if (this.user.password !== this.user.retypePass) {
        this.notif = 'Password didn\'t match'
        setTimeout(() => {
          this.notif = ''
        }, 3000)
      } else {
        axios({
          method: 'POST',
          url: 'https://ecommerge-cms.herokuapp.com/customer/register',
          data: {
            name: this.user.name,
            email: this.user.email,
            password: this.user.password
          }
        })
          .then(({ data }) => {
            this.$router.push({ path: '/login' })
            this.user.name = ''
            this.user.email = ''
            this.user.password = ''
            this.user.retypePass = ''
          })
          .catch(err => {
            this.notif = err.response.data.message
            setTimeout(() => {
              this.notif = ''
            }, 3000)
          })
      }
    }
  }
}
</script>
