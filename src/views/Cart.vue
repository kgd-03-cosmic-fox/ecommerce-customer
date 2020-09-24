<template>
  <div class="table-box">
    <div class="rmv-cart">
      <button class="btn btn-primary rmv" v-on:click.prevent="remove">Remove My Cart</button>
    </div>
    <div>
      <b-alert variant="danger" show v-if="errorMessage" class="text-alert">{{errorMessage}}</b-alert>
      <b-alert variant="success" show v-if="successMessage" class="text-alert">{{successMessage}}</b-alert>
    </div>
    <table class="table table-product">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Amount</th>
            <th scope="col">Total Price Product</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody >
           <CartProduct v-for="cart in carts"
           v-bind:key="cart.id"
           v-bind:cart="cart"
           v-on:success="success"
           v-on:error="error"
           ></CartProduct>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td>Total Price:</td>
           <td>{{totalAmount}}</td>
        </tbody>
    </table>
  </div>
</template>

<script>
import CartProduct from '../components/CartProduct'
import ProductApi from '../api/ProductApi'
export default {
  name: 'Carts',
  components: {
    CartProduct
  },
  data () {
    return {
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    remove () {
      const removeCart = confirm('Are you sure want to delete your Cart List?')
      if (removeCart) {
        ProductApi({
          method: 'delete',
          url: '/carts',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(_ => {
            this.successMessage = 'Deleted'
            this.deleteNotif()
            this.$store.dispatch('fetchDataCart')
          })
          .catch(err => {
            this.errorMessage = err.response.data.message
          })
      }
    },
    success (text) {
      this.successMessage = text
      this.deleteNotif()
    },
    failed (text) {
      this.errorMessage = text
      this.deleteNotif()
    },
    deleteNotif () {
      setTimeout(() => {
        this.successMessage = ''
        this.errorMessage = ''
      }, 2000)
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalAmount () {
      let total = 0
      if (this.carts.length > 0) {
        this.carts.forEach(el => {
          total += (el.Product.price * el.amount)
        })
      }
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(total)
    }
  },
  created () {
    this.$store.dispatch('fetchDataCart')
  }
}
</script>

<style>

</style>
