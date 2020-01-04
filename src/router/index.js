import Vue from 'vue'
import Router from 'vue-router'
import index from "@/components/index"
import client from "@/components/wxbot/client"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/wx/client',
      name: 'client',
      component: client
    },
  ]
})
