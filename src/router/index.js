import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import ActivityList from '@/components/Activity/ActivityList'
// import ActivityDetail from '@/components/Activity/ActivityDetail'
import WelfareList from '@/components/Welfare/WelfareList'
import WelfareDetail from '@/components/Welfare/WelfareDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'home'}},
    {path: '/home', name: 'home', component: Home, meta: {title: '赳赳乐享'}},
    {path: '/enjoylist', name: 'activity.list', component: ActivityList, meta: {title: '最新活动'}},
    // {path: '/activity/detail', name: 'activity.detail', component: ActivityDetail, meta: {title: '活动详情'}}
    {path: '/welfare/list', name: 'welfare.list', component: WelfareList, meta: {title: '赳赳福利'}},
    {path: '/welfare/detail', name: 'welfare.detail', component: WelfareDetail, meta: {title: '优惠券详情'}}
  ]
})
