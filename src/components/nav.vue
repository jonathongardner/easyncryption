<template>
  <nav class='nav'>
    <back-button v-hide='home' />
  </nav>
</template>

<script>
import BackButton from '@/components/back-button'
export default {
  name: 'Nav',
  components: {
    BackButton
  },
  computed: {
    home () {
      return this.$route.name === 'home'
    },
  },
}
</script>

<style scoped lang="scss">
</style>
