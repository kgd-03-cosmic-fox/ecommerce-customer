<template>
  <div class="product-list-box">
    <div v-for="product in products" :key="product.id" class="card mb-3">
      <img :src="product.imgUrl" alt="..." style="width:185px">
      <div class="card-body p-3">
        <div class="card-top">
          <h6 class="card-title" style="font-size: 12px">{{product.name}}</h6>
          <p class="card-text text-reset">Rp.{{product.price}}</p>
        </div>
        <div class="card-bot">
        <router-link :to="`product/${product.id}`" class="btn btn-primary">Product details</router-link>
        <button @click="addToCart(product.id)" class="btn btn-sm btn-outline-success">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Products',
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    deleteProduct (id) {
      const answer = window.confirm('Do you really want to delete this product?')
      if (answer) {
        this.$store.dispatch('deleteProduct', id)
      }
    }
  }
}
</script>

<style>

</style>
