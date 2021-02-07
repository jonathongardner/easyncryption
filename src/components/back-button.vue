<template>
  <router-link to='/' class='back-button'>
    <span class="icon has-text-white">
      <i class="fas fa-arrow-left"></i>
    </span>
  </router-link>
</template>

<script>
export default {
  name: 'BackButton',
}
</script>

<style scoped lang="scss">
.back-button {
  margin: 5px;
}
</style>
