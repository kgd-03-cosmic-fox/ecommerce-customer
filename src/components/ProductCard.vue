<template>
  <div>
    <div class="card" style="width: 18rem">
      <img class="card-img-top" style="width:25vw" :src="product.image_url" />
      <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <p class="card-text row">
          <table class="col-12">
            <tr class="row">
              <th class="col-3 ml-3">Price:</th>
              <td class="col-8">
                {{
                  new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "IDR",
                  }).format(product.price)
                }}
              </td>
            </tr>
            <tr class="row">
              <th class="col-3 ml-3">Stock:</th>
              <td class="col-8">
                {{product.stock}}
              </td>
            </tr>
          </table>
        </p>
        <form class="row justify-content-center" @submit="addToCart()">
          <input type="number" class="col-4" min="0" :max="product.stock" v-model="amount">
          <button type="submit" class="btn btn-primary col-6">Add to Cart</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import cmsAPI from '../api/cms-api.js'
export default {
  props: ['product'],
  data () {
    return {
      amount: 0
    }
  },
  methods: {
    addToCart () {
      cmsAPI({
        url: `/cart/${this.product.id}`,
        method: 'POST',
        headers: { access_token: localStorage.getItem('access_token') },
        data: { amount: this.amount }
      })
        .then(() => {
          this.$store.commit('UPDATE_SUCCESS_MESSAGE', `Successfully added ${this.amount} ${this.product.name} to cart!`)
          this.$store.dispatch('fetchCartContent')
        })
        .catch((err) => {
          this.$store.commit('UPDATE_ERROR_MESSAGE', err.response.data.message)
        })
    }
  }
}
</script>

<style>
</style>
