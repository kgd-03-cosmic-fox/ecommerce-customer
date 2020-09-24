<template>
  <div>
    <table class="table">
      <thead>
        <tr class="row">
          <th class="col-3">
          </th>
          <th scope="col" class="col-3" style="word-wrap: break-word">Name</th>
          <th scope="col" class="col-1" style="word-wrap: break-word">Amount</th>
          <th scope="col" class="col-2">Price</th>
          <th scope="col" class="col-3"></th>
        </tr>
      </thead>
      <tbody>
        <CartContent
        v-for="content in fetchedContent" :key="content.id"
        :content="content"
        >
        </CartContent>
        <!--         <CMSSidebarContent
          v-for="product in productList"
          v-bind:key="product.id"
          v-bind:product="product"
        >
        </CMSSidebarContent> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import CartContent from '../components/CartContent.vue'
export default {
  components: { CartContent },
  computed: {
    fetchedContent () {
      return this.$store.state.cartContent
    }
  },
  methods: {},
  created () {
    this.$store.dispatch('fetchCartContent')
  }
}
</script>

<style>
</style>
