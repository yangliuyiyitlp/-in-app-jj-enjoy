import Vue from 'vue'
import Router from 'vue-router'
import EnjoyList from '@/components/List/enjoyList'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/enjoylist', name: 'enjoylist', component: EnjoyList}
  ]
})
