// vue-router 路由
/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/HelloWorld.vue'
import AboutPage from '@/views/AboutPage.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'HelloWorld',
    component: Home
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: ()=>import('@/views/AboutPage.vue')
  },
  {
    path: '/about2',
    name: 'AboutPage2',
    component: ()=>import("@/views/pages/OneShow.vue")
  }
]
const router = new VueRouter({
  mode: 'history',
//   base: process.env.BASE_URL,
  routes
})

export default router