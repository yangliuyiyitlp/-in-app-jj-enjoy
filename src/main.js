// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$ajax = Axios
Vue.use(MintUI)

// class GLoading {
//   instance = null
//   refs = 0
//
//   attach (ins) {
//     this.instance = ins
//     this.refs++
//   }
//
//   detach () {
//     if (this.refs > 0) {
//       this.refs--
//     }
//     if (this.refs === 0) {
//       this.instance.close()
//     }
//   }
// }
//
// let loading = new GLoading()
// Axios.interceptors.request.use(config => {
//   // element ui Loading方法
//   let ins = MintUI.Indicator.open({
//     text: '加载中...',
//     spinnerType: 'fading-circle'
//   })
//
//   loading.attach(ins)
//   return config
// }, error => {
//   loading.detach()
//   MintUI.Message.error('加载超时')
//   return Promise.reject(error)
// })
// // http响应拦截器
// Axios.interceptors.response.use(data => { // 响应成功关闭loading
//   loading.detach()
//   return data
// }, error => {
//   loading.detach()
//   MintUI.Message.error('加载失败')
//   return Promise.reject(error)
// })

// 拦截器操作放在全局性的地方
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({  // 发起请求前显示
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  return config  // 最终告知插件要干嘛，method、url
})
// 响应拦截器
Axios.interceptors.response.use(function (response) {
  MintUI.Indicator.close()// 响应回来后关闭
  return response
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
