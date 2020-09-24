<template>
  <div class="side-bar">
    <div class="col">
      <div class="my-3">
        <a href="#" @click="logout">Logout</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SideBar',
  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
