<template>
  <div class="card m-2 p-2" style="width: 18rem;  height: 25rem;">
    <img class="card-img-top" :src="item.image_url" width="100px" height="200px">
    <div class="card-body">
      <p class="card-text h3">{{ item.name }}</p>
      <p class="h5">Price : {{ price }}</p>
      <p class="h5">Stock Left : {{ item.stock }}</p>
    </div>
    <div class="card-button">
      <router-link :to="`/detail/${item.id}`"><button type="button" class="btn btn-primary">Add To Cart</button></router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ItemCard',
  props: ['item'],
  computed: {
    price () {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(this.item.price)
    }
  }
}
</script>
