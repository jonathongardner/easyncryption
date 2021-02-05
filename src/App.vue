<template>
  <div id="app">
    <generate-key />
    <encrypt />
    <decrypt />
  </div>
</template>

<script>
import GenerateKey from '@/components/generate-key'
import Encrypt from '@/components/encrypt'
import Decrypt from '@/components/decrypt'
export default {
  name: 'App',
  components: {
    GenerateKey, Encrypt, Decrypt
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
