<template>
  <tr>
    <td>{{ cart.Product.name }}</td>
    <td>{{ price }}</td>
    <td> <button type="button" class="btn btn-warning mx-1" @click="updateCart(cart.id)">Update</button> || <button type="button" class="btn btn-danger mx-1" @click="deleteCart(cart.id)">Delete</button> </td>
    <td class="row">
      <button @click="decrementButton(cart.id)" class="btn-sm btn-secondary" type="button" v-if="buttonMin">-</button>
      <input v-model="ammount" type="text" class="form-control" placeholder="Ammount" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" style="width:60px;">
      <button @click="incrementButton" class="btn-sm btn-secondary" type="button" v-if="buttonPlus">+</button>
    </td>
  </tr>
</template>
<script>
export default {
  name: 'CartTableField',
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
      if (this.ammount > this.cart.Product.stock) {
        this.buttonPlus = false
      } else {
        this.buttonMin = true
        this.buttonPlus = true
        this.ammount++
      }
    },
    decrementButton (id) {
      if (this.ammount < 1) {
        this.buttonMin = false
        const agreement = confirm('Are You Sure Wanna Delete this Item from your cart?')
        if (agreement) {
          this.$store.dispatch('deleteCart', { id: id })
          this.$store.commit('SET_NOTIF', 'Item Has Removed from Your Cart')
          setTimeout(() => {
            this.$store.commit('SET_NOTIF', '')
          }, 3000)
        }
      } else {
        this.buttonMin = true
        this.buttonPlus = true
        this.ammount--
      }
    },
    updateCart (id) {
      if (this.ammount > this.cart.Product.stock || this.ammount < 1) {
        // console.log('Kepanggil')
        this.$store.commit('SET_ERROR_NOTIF', 'Please Correct your Ammount Number')
        setTimeout(() => {
          this.$store.commit('SET_ERROR_NOTIF', '')
        }, 3000)
      } else {
        this.$store.dispatch('cartUpdate', { id: id, ammount: this.ammount })
        this.$store.commit('SET_NOTIF', 'Item Has Updated from Your Cart')
        setTimeout(() => {
          this.$store.commit('SET_NOTIF', '')
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
