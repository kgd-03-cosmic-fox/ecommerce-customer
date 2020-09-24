<template>
  <div class="home">
    <div class="container">
      <div class="row">
          <ProductCard
          v-for="product in products" v-bind:key="product.id"
          v-bind:product="product"
          ></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard'
export default {
  name: 'Home',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchDataProduct')
  }
}
</script>
