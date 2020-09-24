<template>
  <div class="container">
  <div class="product-list-box">
    <div v-for="product in products" :key="product.id" class="card" style="width: 185px;">
      <img :src="product.imgUrl" class="card-img-top" alt="..." style="width:100%">
      <div class="card-body">
        <div class="card-top">
          <h5 class="card-title" style="font-size: 12px">{{product.name}}</h5>
        </div>
        <div class="card-bot">
              <p class="card-text">Rp.{{product.price}}</p>
          <p class="card-text" style="font-size: 12px">Stock: {{product.stock}}</p>
          <router-link :to="`product/${product.id}`" class="btn btn-primary" style="width:100%">Product details</router-link>
        <button @click="addToCart(product.id)" class="btn btn-sm btn-outline-success" style="width:100%">Add to cart</button>
        </div>
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
    addToCart (id) {
      this.$store.dispatch('setAmount', {id, amount: 1})
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
