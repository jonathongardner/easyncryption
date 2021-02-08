<template>
  <div id="easyncryption">
    <nav-bar id='nav' />
    <router-view id='body' />
    <footer-bar id='footer' />
    <modal v-if='!hasAccepted'>
      <template v-slot:header>
        <p class="modal-card-title">Accept Responsibility</p>
      </template>
      <template v-slot:body>
        The developer of this site takes no responsibility for incorrect or poorly
        encrypted files using this application.
        It is up to the user to ensure that all files are encrypted correctly and meet their standards.
        Before using the user should have a good understanding of ecryption methods
        and how to ensure that files are encrypted correctly. <br><br>
        By using this app I accept all responsibilities.
      </template>
      <template v-slot:footer>
        <button class="button is-success" @click='accept' >Accept</button>
      </template>
    </modal>
  </div>
</template>

<script>
import NavBar from '@/components/nav'
import FooterBar from '@/components/footer'
import Modal from '@/components/layout/modal'

export default {
  name: 'App',
  components: {
    NavBar, FooterBar, Modal
  },
  data () {
    return {
      hasAccepted: false
    }
  },
  methods: {
    accept () {
      localStorage.setItem("acceptedResponsibility", true)
      this.hasAccepted = true
    }
  },
  created () {
    this.hasAccepted = localStorage.getItem("acceptedResponsibility")
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
