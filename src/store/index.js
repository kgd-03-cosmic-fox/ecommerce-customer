import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    productDetail: {},
    cartDetail: {},
    notif: '',
    errorNotif: ''
  },
  mutations: {
    SET_NOTIF (state, payload) {
      state.notif = payload
    },
    SET_ERROR_NOTIF (state, payload) {
      state.errorNotif = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_PRODUCT_DETAIL (state, payload) {
      state.productDetail = payload
    },
    SET_CART_DETAIL (state, payload) {
      state.cartDetail = payload
    }
  },
  actions: {
    fetchProduct (context, payload) {
      axios({
        url: 'https://ecommerge-cms.herokuapp.com/customer/items',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          context.commit('SET_ERROR_NOTIF', err)
          setTimeout(() => {
            context.commit('SET_ERROR_NOTIF', '')
          }, 3000)
        })
    },
    fetchCart (context) {
      axios({
        url: 'https://ecommerge-cms.herokuapp.com/customer/cart',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_CARTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProductById (context, payload) {
      axios({
        url: `https://ecommerge-cms.herokuapp.com/customer/items/${payload.id}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCT_DETAIL', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCartProductById (context, payload) {
      axios({
        url: `https://ecommerge-cms.herokuapp.com/customer/cart/${payload.id}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_CART_DETAIL', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart (context, payload) {
      axios({
        url: `https://ecommerge-cms.herokuapp.com/customer/cart/${payload.id}`,
        method: 'POST',
        data: {
          ammount: payload.ammount
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCart (context, payload) {
      axios({
        url: `https://ecommerge-cms.herokuapp.com/customer/cart/${payload.id}`,
        method: 'Delete',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    cartUpdate (context, payload) {
      axios({
        url: `https://ecommerge-cms.herokuapp.com/customer/cart/${payload.id}`,
        method: 'Patch',
        data: {
          ammount: payload.ammount
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
