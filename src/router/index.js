import Vue from 'vue'
import Router from 'vue-router'
// import ActivityDetail from '@/components/Activity/ActivityDetail'
// 以下为首页为home
import Home from '@/components/Home/Home'
import ActivityList from '@/components/Activity/ActivityList'
import WelfareList from '@/components/Welfare/WelfareList'
import WelfareDetail from '@/components/Welfare/WelfareDetail'
import CouponDetail from '@/components/Welfare/CouponDetail'
import Download from '@/components/Download/Download'
// import HDownload from '@/components/Download/HDownload'
// 正在更新中,期待
// import Blank from '@/components/Blank/Blank'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // 以下为首页为列表
    // {path: '/', redirect: {name: 'activity.list'}},
    // {path: '/home', name: 'home', component: Home, meta: {title: '赳赳乐享'}},
    // {path: '/enjoylist', name: 'activity.list', component: ActivityList, meta: {title: '最新活动'}}, // 还原
    // {path: '/welfare/list', name: 'welfare.list', component: WelfareList, meta: {title: '赳赳福利'}},
    // {path: '/welfare/detail', name: 'welfare.detail', component: WelfareDetail, meta: {title: '活动详情'}},
    // {path: '/coupon/detail', name: 'coupon.detail', component: CouponDetail, meta: {title: '优惠券详情'}},
    // {path: '/download', name: 'download', component: Download, meta: {title: '下载应用'}}
    // 正在更新中,期待
    // {path: '/', redirect: {name: 'blank'}},
    // {path: '/enjoylist', name: 'blank', component: Blank, meta: {title: '赳赳乐享'}}, // 首页
    // 以下为首页为home
    {path: '/', redirect: {name: 'home'}},
    {path: '/enjoylist', name: 'home', component: Home, meta: {title: '赳赳乐享'}}, // 首页
    {path: '/activity/list', name: 'activity.list', component: ActivityList, meta: {title: '赳福利'}}, // 还原
    {path: '/welfare/list', name: 'welfare.list', component: WelfareList, meta: {title: '享优惠'}},
    {path: '/welfare/detail', name: 'welfare.detail', component: WelfareDetail, meta: {title: '详情'}},
    {path: '/coupon/detail', name: 'coupon.detail', component: CouponDetail, meta: {title: '优惠券详情'}},
    {path: '/download', name: 'download', component: Download, meta: {title: '下载应用'}}
    // {path: '/h/download', name: 'h.download', component: HDownload, meta: {title: '下载应用'}} // 从h5跳转过来
  ]
})
