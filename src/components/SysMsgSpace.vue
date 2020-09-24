<template>
  <div>
    <ErrorMessage v-if="errorMsg !== null" v-bind:msg="errorMsg"></ErrorMessage>
    <SuccessMessage v-if="successMsg !== null" v-bind:msg="successMsg"></SuccessMessage>
  </div>
</template>

<script>
import ErrorMessage from './ErrorMessage.vue'
import SuccessMessage from './SuccessMessage.vue'
export default {
  computed: {
    errorMsg () {
      return this.$store.state.errorMessage
    },
    successMsg () {
      return this.$store.state.successMessage
    }
  },
  components: { ErrorMessage, SuccessMessage }
}
</script>

<style>
</style>
