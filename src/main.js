// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/base.css'
import baseUrl from './utils/baseUrl'
// import $ from 'n-zepto'
// import zepto from 'zepto'
import '@/utils/H5Methods.js'
import '@/utils/rem.js'

// Vue.prototype.$ = zepto

Vue.use(Vuex)
Vue.use(MintUI)
Vue.config.productionTip = false
Axios.defaults.baseURL = baseUrl
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 超时时间
Axios.defaults.timeout = 5000
Vue.prototype.$ajax = Axios
console.log(process.env.NODE_ENV)

// 拦截器操作放在全局性的地方
Axios.interceptors.request.use(
  config => {
    MintUI.Indicator.open({  // 发起请求前显示
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    return config  // 最终告知插件要干嘛，method、url
  },
  error => {
    MintUI.Indicator.close()// 响应失败关闭
    MintUI.Toast({
      message: '加载超时'
    })
    return Promise.reject(error)
  })
// 响应拦截器
// http响应拦截器
Axios.interceptors.response.use(data => { // 响应成功关闭loading
  MintUI.Indicator.close()
  return data
}, error => {
  MintUI.Indicator.close()
  MintUI.Toast({
    message: '加载失败'
  })
  return Promise.reject(error)
})

// 动态修改 document title
router.beforeEach((to, from, next) => {
  let documentTitle = ''
// path 是多级的，遍历
  to.matched.forEach((path) => {
    if (path.meta.title) {
      documentTitle +=
        `${path.meta.title}`
    }
  })
  document.title = documentTitle
  next()
})

const store = new Vuex.Store({
  state: {
    position: 0
  },
  mutations: {
    SAVE_POSITION (state, position) {
      state.position = position
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
