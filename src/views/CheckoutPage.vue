<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
  <div class="row">
    <div class="col-sm-9 checkout-box-left">
      <div>
        <h1>Shopping Cart</h1>
      </div>
      <div>
        <CheckoutCards
         v-for="product in cartList"
         :key="product.id"
         :product="product"
        ></CheckoutCards>
      </div>
    </div>
    <div class="col-sm-3 checkout-box-right">
      <div class="card" style="width: 18rem;">
  <div class="card-body">
    <div id="total-card" >
    <h5 class="card-title">Subtotal: {{getSubTotal}}</h5>
    <p class="card-text">Total price: {{getSubTotalPrice}}</p>
    <a href="#" class="btn btn-primary">Checkout</a>
    </div>
  </div>
</div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import CheckoutCards from '../components/CheckoutCards'

export default {
  name: 'CheckoutPage',
  components: {
    NavBar, CheckoutCards
  },
  computed: {
    cartList () {
      return this.$store.state.cartProducts
    },
    getSubTotal () {
      let total = 0
      this.$store.state.cartProducts.forEach((el) => {
        total += el.amount
      })
      return total
    },
    getSubTotalPrice () {
      let total = 0
      this.$store.state.cartProducts.forEach((el) => {
        total += (el.amount * el.Product.price)
      })
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(total)
    }
  },
  created () {
    this.$store.dispatch('fetchCartProducts')
  }
}
</script>

<style>

</style>
