<template>
  <div class="col-9">
    <div class="row">
      <ItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      ></ItemCard>
    </div>
  </div>
</template>
<script>
import ItemCard from './ItemCard.vue'
export default {
  name: 'ListOfItem',
  components: {
    ItemCard
  },
  computed: {
    items () {
      return this.$store.state.products
    }
  }
}
</script>
