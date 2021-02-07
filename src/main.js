import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles.scss'

Vue.config.productionTip = false
// Extract the function out, up here, so I'm not writing it twice
const update = ({ style }, binding) => {
  style.visibility = (binding.value) ? "hidden" : ""
}

Vue.directive("hide", {
    // Run on initialisation (first render) of the directive on the element
    bind: update,
    // Run on subsequent updates to the value supplied to the directive
    update: update
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
