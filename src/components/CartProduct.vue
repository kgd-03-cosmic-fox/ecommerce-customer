<template>
<tr>
<th scope="row"><img v-bind:src="cart.Product.image_url" alt="desk"></th>
<td>{{cart.Product.name}}</td>
<td>{{priceFormat}}</td>
<td>{{add}}</td>
<td>{{total}}</td>
<td>
  <div class="update-cart">
  <button class="btn btn-primary" v-on:click.prevent="update('down', cart.id)">-</button>
  <input type="number" v-model="add" min="0" :max="cart.Product.stock" disabled>
  <button class="btn btn-primary" v-on:click.prevent="update('up', cart.id)">+</button>
  <img class="bi" id="delete" src="../assets/trashcan.png" alt="trash" v-on:click.prevent="deleteCart(cart.id)">
  </div>
</td>
</tr>
</template>

<script>
import ProductApi from '../api/ProductApi'
export default {
  name: 'CartProduct',
  props: ['cart'],
  data () {
    return {
      add: this.cart.amount
    }
  },
  methods: {
    update (state, id) {
      if (state === 'down' && this.add > 0) {
        this.add -= 1

        ProductApi({
          method: 'put',
          url: `/carts/${id}`,
          data: {
            amount: this.add
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(_ => {
            this.$store.dispatch('fetchDataCart')
            this.$emit('success', 'Updated')
          })
          .catch(err => {
            this.$emit('error', err.response.data.message)
          })
      } else if (state === 'up' && this.add < this.cart.Product.stock) {
        this.add += 1

        ProductApi({
          method: 'put',
          url: `/carts/${id}`,
          data: {
            amount: this.add
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(_ => {
            this.$emit('success', 'Updated')
          })
          .catch(err => {
            this.$emit('error', err.response.data.message)
          })
      }
    },
    deleteCart (id) {
      const deleteProductCard = confirm('Are you sure want to delete this from your Cart?')
      if (deleteProductCard) {
        ProductApi({
          method: 'delete',
          url: `carts/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(_ => {
            this.$store.dispatch('fetchDataCart')
            this.$emit('success', 'Deleted')
          })
          .err(err => {
            this.$emit('error', err.response.data.message)
          })
      }
    }
  },
  computed: {
    total () {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(this.cart.Product.price * this.add)
    },
    priceFormat () {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(this.cart.Product.price)
    }
  }
}
</script>

<style>

</style>
