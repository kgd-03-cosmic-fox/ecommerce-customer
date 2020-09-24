<template>
  <div class="">
    <NavBar/>
    <div class="container update-box mt-4" style="height:100vh">
      <div class="col-sm-5 border border-secondary product-list-box pt-4">
      <img :src="getProduct.imgUrl" class="card-img-top" alt="...">
    </div>
      <div class="col-sm py-4 border border-secondary">
      <div id="card-body">
        <div class="upper-body">
          <h3>{{getProduct.name}}</h3>
          <h5 class="card-title" >{{getProduct.name}}</h5>
          <p class="card-text">Rp. {{getProduct.price}}</p>
          <p class="card-text">Stock {{getProduct.stock}}</p>
        </div>
        <div class="lower-body">
          <button @click="addToCart(product.id)" class="btn btn-sm btn-outline-primary">Add to cart</button>
        </div>
      </div>
      </div>
      </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar'
import kobajaApi from '../api/kobajaApi'

export default {
  name: 'CategoryPage',
  data () {
    return {
      product: {
        name: '',
        category: '',
        price: 0,
        stock: 0,
        imgUrl: ''
      },
      getProduct: {
        name: '',
        price: 0,
        stock: 0,
        imgUrl: ''
      }
    }
  },
  components: {
    NavBar
  },
  methods: {
    addToCart (id) {
      this.$store.dispatch('addProductToCart', { id, amount: 1 })
    },
    fetchProductById () {
      kobajaApi({
        url: `/product/${this.$route.params.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.getProduct.name = data.product.name
          this.getProduct.price = data.product.price
          this.getProduct.stock = data.product.stock
          this.getProduct.imgUrl = data.product.imgUrl
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchProductById()
  }
}

</script>

<style>
.update-box{
  display: flex;
  flex-direction: row;
}

</style>
