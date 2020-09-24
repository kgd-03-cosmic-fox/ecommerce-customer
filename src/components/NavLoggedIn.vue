<template>
<div class="row">
  <div class="col-2 pl-1">
        <button class="btn btn-info btn-lg">
          Cart
        </button>
  </div>
  <h5 class="col-8">Welcome back, user!<br></h5>
  <button
    class="btn btn-outline-danger my-2 my-sm-0 col-2"
    type="button"
    @click.prevent="logout()">
    Log out
  </button>
</div>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('USER_STATE', null)
    }
  }
}
</script>

<style>

</style>
