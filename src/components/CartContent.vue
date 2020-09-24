<template>
  <tr class="row">
    <th class="col-3">
      <img
        class="card-img-top"
        style="width: 10vw"
        :src="content.Product.image_url"
      />
    </th>
    <td scope="col" class="col-3" style="word-wrap: break-word">
      {{ content.Product.name }}
    </td>
    <td scope="col" class="col-1" style="word-wrap: break-word">
      {{ content.amount }}
    </td>
    <td scope="col" class="col-2">
      {{
        new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "IDR",
        }).format(content.Product.price)
      }}
    </td>
    <td scope="col" class="col-3">
      <div class="row">
        <div class="col-8">
          <form class="row justify-content-center" @submit.prevent="modifyCartContent()">
            <input type="number" class="col-4" min="0" :max="content.Product.stock" v-model="amount" />
            <button type="submit" class="btn btn-primary col-6">Modify</button>
          </form>
        </div>
        <div class="col-4">
          <button class="btn btn-danger" @click="deleteCartContent()">Remove</button>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import cmsAPI from '../api/cms-api.js'
export default {
  data () {
    return {
      amount: 0
    }
  },
  props: ['content'],
  methods: {
    deleteCartContent () {
      cmsAPI({
        url: `/cart/${this.content.id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          this.$store.dispatch('fetchCartContent')
        })
        .catch((err) => {
          this.$store.commit('UPDATE_ERROR_MESSAGE', err.response.data.message)
        })
    },
    modifyCartContent () {
      cmsAPI({
        url: `/cart/${this.content.id}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          amount: this.amount
        }
      })
        .then(() => {
          this.$store.dispatch('fetchCartContent')
        })
        .catch((err) => {
          this.$store.commit('UPDATE_ERROR_MESSAGE', err.response.data.message)
        })
    }
  },
  computed: {},
  created () {
    this.amount = this.content.amount
  }
}
</script>

<style>
</style>
