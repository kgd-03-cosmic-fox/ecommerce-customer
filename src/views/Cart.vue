<template>
  <div class="checkout-page">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">H8Shop</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/cart">My Cart</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div class="home-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-3" style="background-color: #c2ccd0; height: 100vh;">
              <div class="side-bar">
                <div class="col">
                  <div class="my-3">
                    <a href="#" @click="logout">Logout</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-9 my-4">
                <div class="alert alert-success" role="alert" v-if="this.$store.state.notif">
                  {{ this.$store.state.notif }}
                </div>
                <div class="alert alert-danger" role="alert" v-if="this.$store.state.errorNotif">
                  {{ this.$store.state.errorNotif }}
                </div>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Item Name</th>
                    <th scope="col">Item Price per Each</th>
                    <th scope="col">Action</th>
                    <th scope="ro">Ammount</th>
                  </tr>
                </thead>
                <tbody>
                  <CartTableField
                  v-for="cart in carts"
                  :key="cart.id"
                  :cart="cart"></CartTableField>
                </tbody>
                <tr>
                  <td>Total Price: {{ totalPrice }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
// import CartBox from '../components/CartBox.vue'
import CartTableField from '../components/CartTableField.vue'
export default {
  name: 'CartPage',
  components: {
    // CartBox
    CartTableField
  },
  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({ path: '/login' })
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.dispatch('fetchCart', { message: '' })
    } else {
      this.$router.push({ path: '/login' })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('access_token')) {
      next()
    } else {
      next('/login')
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalPrice () {
      const data = this.$store.state.carts
      let totalPrice = 0
      data.forEach((el) => {
        totalPrice = totalPrice + el.ammount * el.Product.price
      })
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(totalPrice)
    }
  }
}
</script>
