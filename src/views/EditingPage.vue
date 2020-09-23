<template>
  <div class="">
    <NavBar/>
    <div class="container update-box mt-4" style="height:100vh">
      <div class="col-sm-5 border border-secondary product-list-box pt-4">
      <img :src="getProduct.imgUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title" >{{getProduct.name}}</h5>
        <p class="card-text">Rp. {{getProduct.price}}</p>
        <p class="card-text">Stock {{getProduct.stock}}</p>
        <button @click="deleteProduct" class="btn btn-sm btn-outline-primary">Add to cart</button>
      </div>
    </div>
      <div class="col-sm py-4 border border-secondary">
        <h3>{{getProduct.name}}</h3>
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
    editProduct () {
      kobajaApi({
        url: `/product/${this.$route.params.id}`,
        method: 'PUT',
        data: {
          name: this.product.name,
          category: this.product.category,
          price: this.product.price,
          stock: this.product.stock,
          imgUrl: this.product.imgUrl
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          window.confirm(data.message)
        })
        .catch((err) => {
          window.confirm(err)
          console.log(err)
        })
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
    },
    deleteProduct () {
      const answer = window.confirm('Are you sure you want to delete this product?')
      if (answer) {
        kobajaApi({
          url: `product/${this.$route.params.id}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(data => {
            window.confirm('Product has been deleted')
            this.$router.push({ name: 'CategoryPage' })
          })
          .catch(_ => {
            window.confirm('Error gan..')
            console.log('Error :(')
          })
      }
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
