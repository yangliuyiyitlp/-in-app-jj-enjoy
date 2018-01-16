import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import ActivityList from '@/components/Activity/ActivityList'
// import ActivityDetail from '@/components/Activity/ActivityDetail'
import WelfareList from '@/components/Welfare/WelfareList'
import WelfareDetail from '@/components/Welfare/WelfareDetail'
import CouponDetail from '@/components/Welfare/CouponDetail'
import Download from '@/components/Download/Download'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/', redirect: {name: 'home'}},
    {path: '/', redirect: {name: 'activity.list'}},
    {path: '/home', name: 'home', component: Home, meta: {title: '赳赳乐享'}},
    {path: '/enjoylist', name: 'activity.list', component: ActivityList, meta: {title: '赳赳乐享'}}, // 还原
    // {path: '/activity/detail', name: 'activity.detail', component: ActivityDetail, meta: {title: '活动详情'}}
    {path: '/welfare/list', name: 'welfare.list', component: WelfareList, meta: {title: '赳赳福利'}},
    {path: '/welfare/detail', name: 'welfare.detail', component: WelfareDetail, meta: {title: '活动详情'}},
    {path: '/coupon/detail', name: 'coupon.detail', component: CouponDetail, meta: {title: '优惠券详情'}},
    {path: '/download', name: 'download', component: Download, meta: {title: '下载应用'}}
  ]
})
