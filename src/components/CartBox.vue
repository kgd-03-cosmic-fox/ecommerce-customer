<template>
  <div class="cart-list">
    <div class="alert alert-success" role="alert" v-if="notif">
      {{ notif }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="errorNotif">
      {{ errorNotif }}
    </div>
    <div class="cart-item border border-secondary m-2">
        <div class="row">
          <div class="col-8">
              <h3>{{ cart.Product.name }}</h3>
              <h5>Price: {{ price }}</h5>
              <h6>Ammount: {{ ammount }}</h6>
          </div>
          <div class="col-4">
            <i class="fa fa-close" style="font-size:24px;color:red;margin-left:260px;" @click="deleteCart(cart.id)"></i>
              <div class="cart-modify" style="margin-top:76px">
                <div class="row mx-4">
                  <button type="button" class="btn btn-warning mx-1" @click="updateCart(cart.id)">Update</button>
                  <button @click="decrementButton(cart.id)" class="btn btn-outline-secondary" type="button" v-if="buttonMin">-</button>
                  <input v-model="ammount" type="text" class="form-control" placeholder="Ammount" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" style="width:80px;">
                  <button @click="incrementButton" class="btn btn-outline-secondary" type="button" v-if="buttonPlus">+</button>
                </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CartBox',
  props: ['cart'],
  data () {
    return {
      ammount: this.cart.ammount,
      buttonPlus: true,
      buttonMin: true,
      notif: '',
      errorNotif: ''
    }
  },
  methods: {
    deleteCart (id) {
      const agreement = confirm('Are You Sure Wanna Delete this Item from your cart?')
      if (agreement) {
        this.$store.dispatch('deleteCart', { id: id })
        this.notif = 'Item Has Removed from Your Cart'
        setTimeout(() => {
          this.notif = ''
        }, 3000)
      }
    },
    incrementButton () {
      if (this.ammount > this.cart.Product.stock - 1) {
        this.buttonPlus = false
      } else {
        this.buttonMin = true
        this.buttonPlus = true
        this.ammount++
      }
    },
    decrementButton (id) {
      if (this.ammount < 1) {
        const agreement = confirm('Are You Sure Wanna Delete this Item from your cart?')
        if (agreement) {
          this.buttonMin = false
          this.$store.dispatch('deleteCart', { id: id })
          this.notif = 'Item Has Removed from Your Cart'
          setTimeout(() => {
            this.notif = ''
          }, 3000)
        }
      } else {
        this.buttonMin = true
        this.buttonPlus = true
        this.ammount--
      }
    },
    updateCart (id) {
      if (this.ammount > this.cart.Product.stock - 1 || this.ammount < 1) {
        // console.log('Kepanggil')
        this.errorNotif = 'Please Correct your Ammount Number'
        setTimeout(() => {
          this.errorNotif = ''
        }, 3000)
      } else {
        this.$store.dispatch('cartUpdate', { id: id, ammount: this.ammount })
        this.notif = 'Item Has Updated from Your Cart'
        setTimeout(() => {
          this.notif = ''
        }, 3000)
      }
    }
  },
  computed: {
    price () {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR' }).format(this.cart.Product.price)
    }
  }
}
</script>
