<template>
  <nav class='nav'>
    <router-link :to='{ name: "home" }' class='nav-button' v-hide='home'>
      <span class="icon has-text-white">
        <i class="fas fa-arrow-left"></i>
      </span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  computed: {
    home () {
      return this.$route.name === 'home'
    },
  },
}
</script>

<style scoped lang="scss">
.nav-button {
  margin: 5px;
}

</style>
