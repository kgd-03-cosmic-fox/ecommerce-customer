import Vue from 'vue'
import Vuex from 'vuex'
import cmsAPI from '../api/cms-api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    products: [],
    cartContent: [],
    currentEdit: null,
    errorMessage: null,
    successMessage: null
  },
  mutations: {
    USER_STATE (state, payload) {
      state.user = payload
    },
    UPDATE_CART_CONTENT (state, payload) {
      state.cartContent = payload
    },
    UPDATE_PRODUCTS_STATE (state, payload) {
      state.products = payload
    },
    UPDATE_ERROR_MESSAGE (state, payload) {
      state.successMessage = null
      state.errorMessage = payload
    },
    UPDATE_SUCCESS_MESSAGE (state, payload) {
      state.errorMessage = null
      state.successMessage = payload
    }
  },
  actions: {
    fetchCartContent (context) {
      cmsAPI({
        url: '/cart',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('UPDATE_CART_CONTENT', data.CartProducts)
        })
        .catch((err) => {
          context.commit('UPDATE_ERROR_MESSAGE', err.response)
        })
    },
    fetchProductDatas (context) {
      cmsAPI({
        url: '/products',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('UPDATE_PRODUCTS_STATE', data)
        })
        .catch((err) => {
          context.commit('UPDATE_ERROR_MESSAGE', err.response.data.message)
        })
    }
  },
  modules: {
  }
})
