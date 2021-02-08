<template>
  <div id="easyncryption">
    <nav-bar id='nav' />
    <router-view id='body' />
    <footer-bar id='footer' />
  </div>
</template>

<script>
import NavBar from '@/components/nav'
import FooterBar from '@/components/footer'

export default {
  name: 'App',
  components: {
    NavBar, FooterBar
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
#easyncryption {
  font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
  background-color: #233D4D;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  #nav {
    height: 50px;
  }
  #body {
    flex: 1;
    // Center everything
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div {
      margin: 5px;
    }
  }
  #footer {
    height: 50px;
  }
}
body {
  margin: 0px;
}
.secret-button {
  margin: 5px;
  background: none!important;
  border: none;
  padding: 0!important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #069;
  text-decoration: underline;
  cursor: pointer;
}
</style>
