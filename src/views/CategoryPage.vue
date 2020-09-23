<template>
  <div class="p-4">
    <NavBar/><br><br>
    <div v-if="notification.show" class="alert alert-success" role="alert">
  {{notification.message}}
</div>
    <div class="col-sm border border-secondary product-list-box">
        <router-link class="btn btn-lg btn-outline-warning" to="/category/manual-brewers">MANUAL-BREWERS</router-link>
        <router-link class="btn btn-lg btn-outline-warning" to="/category/coffee-machines">COFFEE-MACHINES</router-link>
        <router-link class="btn btn-lg btn-outline-warning" to="/category/coffees">COFFEE</router-link>
      </div>
      <div class="col-sm border border-secondary product-list-box">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'

export default {
  name: 'CategoryPage',
  computed: {
    notification () {
      return this.$store.state.notification
    }
  },
  data () {
    return {
      product: {
        name: '',
        category: '',
        price: 0,
        stock: 0,
        imgUrl: ''
      },
      showAddProduct: false,
      showCloseButton: false
    }
  },
  components: {
    NavBar
  },
  methods: {
    addNewProduct () {
      const newProduct = {
        name: this.product.name,
        category: this.product.category,
        price: this.product.price,
        stock: this.product.stock,
        imgUrl: this.product.imgUrl
      }
      this.$store.dispatch('addNewProduct', newProduct)
    },
    showAddProductForm () {
      this.showAddProduct = true
      this.showCloseButton = true
    },
    closeButton () {
      this.showAddProduct = false
      this.showCloseButton = false
    }
  },
  created () {
    // this.$router.push({ path: '/category/manual-brewers' })
  }
}
</script>

<style>

.product-list-box{
    display: flex;
    flex-direction: row;
    justify-content: initial;
    padding: 25px;
    flex-wrap: wrap;
}
</style>
