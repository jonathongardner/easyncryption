<template>
  <div>
    <div>
      <router-link :to='{ name: "generate-key" }' class="button">
        <span class="icon">
          <i class="fas fa-key"></i>
        </span>
        <span>Generate key</span>
      </router-link>
    </div>
    <div>
      <router-link :to='{ name: "encrypt" }' class="button">
        <span class="icon">
          <i class="fas fa-lock"></i>
        </span>
        <span>Encrypt files</span>
      </router-link>
    </div>
    <div>
      <router-link :to='{ name: "decrypt" }' class="button">
        <span class="icon">
          <i class="fas fa-unlock"></i>
        </span>
        <span>Decrypt files</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeNavigation',
}
</script>

<style lang='scss' scoped>
</style>
