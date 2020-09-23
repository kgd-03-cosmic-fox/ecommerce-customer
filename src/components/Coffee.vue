<template>
  <div class="container">
  <div class="product-list-box">
    <div v-for="product in products" :key="product.id" class="card" style="width: 15rem;">
      <img :src="product.imgUrl" class="card-img-top" alt="..." style="width:200px">
      <div class="card-body">
        <h5 class="card-title" >{{product.name}}</h5>
        <p class="card-text">Rp.{{product.price}}</p>
        <p class="card-text">Stock: {{product.stock}}</p>
        <router-link :to="`/product/${product.id}`" class="btn btn-primary">Product details</router-link>
        <button @click='deleteProduct(product.id)' class="btn btn-sm btn-outline-primary">Add to cart</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'Coffees',
  computed: {
    products () {
      return this.$store.state.products
        .filter(elem => elem.category === 'coffees')
    }
  },
  methods: {
    deleteProduct (id) {
      const answer = window.confirm('Do you really want to delete this product?')
      if (answer) {
        this.$store.dispatch('deleteProduct', id)
      }
    }
  },
  created () {
    this.$store.dispatch('fetchDataProducts')
  }
}
</script>

<style>
  .product-list-box{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }
  .card-body{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
