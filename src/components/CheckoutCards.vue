<template>
  <div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="product.Product.imgUrl" class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{product.Product.name}}</h5>
        <p class="card-text">Rp {{product.Product.price}}</p>
      </div>
      <div class="input-group mx-3 mb-3" style="width: 27%">
      <div class="input-group-prepend">
        <button @click="decerementCart(product.Product.id)" class="btn btn-sm btn-outline-secondary" type="button" id="button-addon1">-</button>
      </div>
      <input disabled min="1" style="text-align:center" class="form-control" :value="product.amount"  :placeholder="product.amount" aria-label="Example text with button addon" aria-describedby="button-addon1">
        <button @click="addToCart(product.Product.id)" class="btn btn-outline-secondary" type="button" id="button-addon1">+</button>
      </div>
      <div class="d-flex flex-row-reverse bd-highlight">
        <button @click="deleteProductFromCartList(product.id)" class="btn btn-sm btn-danger m-2">x</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CheckoutCards',
  props: ['product'],
  methods: {
    addToCart (id) {
      this.$store.dispatch('setAmount', { id, amount: 1 })
    },
    deleteProductFromCartList (id) {
      const answer = window.confirm('are you sure you want delete this product from cart list?')
      if (answer === true) {
        this.$store.dispatch('deleteProductFromCartList', id)
      }
    },
    decerementCart (id) {
      this.$store.dispatch('setAmount', { id, amount: -1 })
    }
  }
}
</script>

<style>

</style>
