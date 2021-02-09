import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import GenerateKey from '@/views/GenerateKey.vue'
import Encrypt from '@/views/Encrypt.vue'
import Decrypt from '@/views/Decrypt.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/generate-key',
    name: 'generate-key',
    component: GenerateKey
  }, {
    path: '/encrypt',
    name: 'encrypt',
    component: Encrypt
  },{
    path: '/decrypt',
    name: 'decrypt',
    component: Decrypt
  }, {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@/views/NotFoundPage.vue'),
  }, {
    path: '*',
    redirect: 'not-found',
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
