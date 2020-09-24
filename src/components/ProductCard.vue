<template>
  <div class="card col-3">
  <img class="card-img-top img-size" :src="product.image_url" alt="Product...">
  <div class="card-body">
    <div class="text-card">
    <h5 class="card-title">{{product.name}}</h5>
    <p class="card-text">
      Price: {{formatPrice}} <br>
      Stock: {{product.stock}} left</p>
    </div>
    <div class="add-cart">
      <button class="btn btn-primary" v-on:click.prevent="down">-</button>
        <input type="number" v-model="add" min="0" :max="product.stock" disabled>
      <button class="btn btn-primary" v-on:click.prevent="up">+</button>
    </div>
    <div class="add-to-cart">
      <button class="btn btn-primary" v-on:click.prevent="addCart(product.id)">Add to Cart</button>
      <img src="../assets/success-icon.png" alt="success" v-if="addSuccess">
    </div>
    <div>
      <b-alert class="alert-error" variant="danger" show v-if="failedAdd" >{{failedAdd}}</b-alert>
    </div>
    <div>
    </div>
  </div>
</div>
</template>

<script>
import ProductApi from '../api/ProductApi'
export default {
  name: 'ProductCard',
  props: ['product'],
  data () {
    return {
      add: 0,
      statusDown: 'disabled',
      statusUp: '',
      addSuccess: false,
      failedAdd: ''
    }
  },
  computed: {
    formatPrice () {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(this.product.price)
    }
  },
  methods: {
    up () {
      if (this.add < this.product.stock) {
        this.add += 1
      }
    },
    down () {
      if (this.add > 0) {
        this.add -= 1
      }
    },
    deleteNotif () {
      setTimeout(() => {
        this.addSuccess = false
        this.failedAdd = ''
      }, 2500)
    },
    addCart (id) {
      ProductApi({
        method: 'post',
        url: `/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          amount: this.add
        }
      })
        .then(_ => {
          this.addSuccess = true
        })
        .catch(err => {
          this.failedAdd = err.response.data.message
        })
        .finally(_ => {
          this.deleteNotif()
          this.add = 0
        })
    }
  }
}
</script>

<style>

</style>
