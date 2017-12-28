import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import EnjoyList from '@/components/Activity/enjoyList'
import WelfareList from '@/components/Welfare/WelfareList'
import WelfareDetail from '@/components/Welfare/WelfareDetail'
// import EnjoyDetail from '@/components/Activity/enjoyDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'home'}},
    {path: '/home', name: 'home', component: Home, meta: {title: '赳赳乐享'}},
    {path: '/enjoylist', name: 'enjoylist', component: EnjoyList, meta: {title: '最新活动'}},
    {path: '/welfare/list', name: 'welfare.list', component: WelfareList, meta: {title: '赳赳福利'}},
    {path: '/welfare/detail', name: 'welfare.detail', component: WelfareDetail, meta: {title: '优惠券详情'}}
    // {path: '/enjoydetail', name: 'enjoydetail', component: EnjoyDetail, meta: {title: '活动详情'}}
  ]
})
