<template>
  <div>
    <div class="card" style="width: 18rem">
      <img class="card-img-top" style="width:300px" :src="product.image_url" />
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
        <form class="row justify-content-center">
          <button class="btn btn-primary col-6">Add to Cart</button>
          <input type="number" class="col-4" min="0" :max="product.stock">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>

<style>
</style>
