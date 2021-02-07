<template>
  <footer>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    notHome () {
      return this.$route.name !== 'home'
    },
  },
}
</script>

<style scoped lang="scss">
</style>
