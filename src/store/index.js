import Vue from 'vue'
import Vuex from 'vuex'
import ProductApi from '../api/ProductApi'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    successMessage: '',
    errorMessage: '',
    carts: [],
    statusLogin: false
  },
  mutations: {
    SET_PRODUCT_ITEM (state, payload) {
      state.products = payload
    },
    SET_MESSAGE_ERROR (state, payload) {
      state.errorMessage = payload
    },
    SET_MESSAGE_SUCCESS (state, payload) {
      state.successMessage = payload
    },
    SET_STATUS_LOGIN (state, payload) {
      state.statusLogin = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    fetchDataProduct (context) {
      ProductApi({
        method: 'get',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCT_ITEM', data)
        })
        .catch(err => {
          context.commit('SET_MESSAGE_ERROR', err.response.data.message)
        })
    },
    fetchDataCart (context) {
      ProductApi({
        method: 'get',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_CARTS', data)
        })
        .catch(err => {
          context.commit('SET_MESSAGE_ERROR', err.response.data.message)
        })
    }
  },
  modules: {
  }
})
