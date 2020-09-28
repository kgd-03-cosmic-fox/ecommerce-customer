<template>
  <div class="container">
    <div class="row" v-if="productList">
      <ProductCard
        class="col-4"
        v-for="product in productList"
        v-bind:key="product.id"
        v-bind:product="product"
      >
      </ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'
export default {
  components: { ProductCard },
  methods: {},
  computed: {
    productList () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProductDatas')
  }
}
</script>

<style>
</style>
