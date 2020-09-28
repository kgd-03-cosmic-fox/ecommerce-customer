<template>
  <div id="app" style="width: 97vw">
    <Navbar style="width: 96vw"></Navbar>
    <SysMsgSpace></SysMsgSpace>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import SysMsgSpace from './components/SysMsgSpace.vue'
export default {
  components: { Navbar, SysMsgSpace },
  methods: {},
  computed: {},
  created () {
    const name = localStorage.getItem('access_token')
    if (name) {
      this.$store.commit('USER_STATE', name)
    } else {
      this.$store.commit('USER_STATE', null)
    }
  }
}
</script>
