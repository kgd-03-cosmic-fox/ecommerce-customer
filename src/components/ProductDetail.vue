<template>
  <div class="col-9">
    <div class="alert alert-danger" role="alert" v-if="errorAlert">
      {{ this.errorAlert }}
    </div>
    <div class="row">
      <div class="col col-lg-7 col-sm-auto col-md-auto">
        <img :src="product.image_url" height="400px" width="600px" style="margin-top:150px;" class="img-fluid">
      </div>
      <div class="col col-lg-5 col-sm-auto col-md-auto" style="margin-top:200px">
        <div class="container-fluid">
          <h1>{{ product.name }}</h1>
          <h4 style="margin-top:40px">Stock : {{ product.stock }}</h4>
          <h4>Price : {{ price }}</h4>
          <div class="input-group">
            <div class="input-group-append" id="button-addon4">
              <button class="btn btn-outline-secondary" type="button" @click="minAmmount" v-if="this.buttonMin">-</button>
              <input v-model="ammount" type="text" class="form-control" placeholder="Ammount" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4">
              <button @click="addAmmount" class="btn btn-outline-secondary" type="button" v-if="this.buttonPlus">+</button>
            </div>
          </div>
          <div class="button-group" style="margin-top:30px;">
            <button type="button" class="btn btn-secondary mx-2" @click="addToCart(product.id)">Add to Cart</button>
            <button type="button" class="btn btn-secondary" @click="back">Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      ammount: 0,
      buttonPlus: true,
      buttonMin: true,
      errorAlert: ''
    }
  },
  methods: {
    addAmmount () {
      if (this.ammount > this.product.stock - 1) {
        this.buttonPlus = false
      } else {
        this.buttonMin = true
        this.buttonPlus = true
        this.ammount++
      }
    },
    minAmmount () {
      if (this.ammount < 1) {
        this.buttonMin = false
      } else {
        this.buttonMin = true
        this.buttonPlus = true
        this.ammount--
      }
    },
    addToCart (id) {
      if (this.ammount > this.product.stock - 1 || this.ammount < 1) {
        this.errorAlert = 'Please Correct your Ammount Number'
        setTimeout(() => {
          this.errorAlert = ''
        }, 3000)
      } else {
        this.$store.dispatch('addCart', { id: id, ammount: this.ammount })
        this.$router.push({ path: '/' })
      }
    },
    back () {
      this.$router.push({ path: '/' })
    }
  },
  created () {
    this.$store.dispatch('fetchProductById', { id: this.$route.params.id })
  },
  computed: {
    product () {
      return this.$store.state.productDetail
    },
    price () {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(this.$store.state.productDetail.price)
    }
  }
}
</script>
