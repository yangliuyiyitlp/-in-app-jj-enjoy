<template>
  <div id="home">

    <ads></ads>
    <activity></activity>
    <welfare></welfare>

  </div>
</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'
  import Ads from '@/components/Ads/Ads'
  import Activity from '@/components/Activity/Activity'
  import Welfare from '@/components/Welfare/Welfare'

  export default {
    components: {
      Ads,
      Activity,
      Welfare
    },
    data () {
      return {
        list: []
      }
    },
    created () {
      this.saveData()
    },
    methods: {
      // 导航离开该组件时把位置存起来
      beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        let getScrollTop = () => {
          let scrollTop = 0
          if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop
          } else if (document.body) {
            scrollTop = document.body.scrollTop
          }
          return scrollTop
        }
        let scrollTop = getScrollTop()
        sessionStorage.setItem('HomeScrollTop', scrollTop) // 离开首页路由时把位置存起来
//      console.log(scrollTop)
        next()
      },
      // 返回该页面时取出scrollTop
      updated () {
        let _this = this
        // 返回同一个位置
        let scrollTop = +sessionStorage.getItem('HomeScrollTop') // 返回首页页面取出来
        if (scrollTop) {
          _this.$nextTick(function () {
            window.scroll(0, scrollTop)
          })
        }
      },
      // 将userId等数据保存在本地中
      saveData () {
        // sessionStorage.setItem('userId', '0')
        // sessionStorage.setItem('userId', '2c9094435f8055a1015f80c5711d0029')
        // sessionStorage.setItem('isApp', '1')
        // 本地存在但原生传过来的是0 就不存储
        if (!sessionStorage.getItem('userId') && +nativeMethods.getQS('userId') !== 0) {
          sessionStorage.setItem('userId', nativeMethods.getQS('userId'))
        } else if (!sessionStorage.getItem('userId') && +nativeMethods.getQS('userId') === 0) {
          sessionStorage.setItem('userId', 0)
        }
        sessionStorage.setItem('isApp', nativeMethods.getQS('isApp'))
        if (nativeMethods.getQS('cityName')) {
          sessionStorage.setItem('cityName', nativeMethods.getQS('cityName'))
        } else {
          sessionStorage.setItem('cityName', 'default')
        }
        //        判断终端 1:android 2:ios',对应显示不同列表
        let u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
          sessionStorage.setItem('platform', 1)
        } else {
          sessionStorage.setItem('platform', 2)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #home {
    background-color: #F9F9F9;
  }

</style>
