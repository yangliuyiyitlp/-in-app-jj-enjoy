<template>
  <div class="list">
    <!--<div id="apptest5" @click="toShare">shareActivityPlatform</div>-->
    <!--<div id="apptest1" @click="toHome">goToHomeEvent</div>-->
    <!--<div id="apptest2" @click="toScan">toScan</div>-->
    <!--<div id="apptest3" @click="goToScanSpecialEvent">goToScanSpecialEvent</div>-->
    <!--<div id="apptest4" @click="toLogin">gotoLogin</div>-->

    <ul>
      <li v-for="(item, index) in list">
        <a :href='item.activityPath'>
          <img v-lazy="item.imgPath">
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        userId: '',
        isApp: '',
        cityName: '',
        list: []
      }
    },
    created () {
      // 将ues保存在本地中
      this.saveUser()
      this.getList()
    },
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
      sessionStorage.setItem('scrollTop', scrollTop) // 离开路由时把位置存起来
//      console.log(scrollTop)
      next()
    },
    // 返回该页面时取出scrollTop
    updated () {
      let _this = this
      // 返回同一个位置
      let scrollTop = +sessionStorage.getItem('scrollTop') // 返回页面取出来
//      console.log(111, scrollTop)
      if (scrollTop) {
        _this.$nextTick(function () {
          window.scroll(0, scrollTop)
        })
      }
//      this.$nextTick(function () {
//        let position = this.$store.state.position // 返回页面取出来
//        window.scroll(0, position)
//        console.log(position)
//      })
    },
    methods: {
      // 获取列表
      getList () {
        this.userId = nativeMethods.getQS('userId')
        this.isApp = nativeMethods.getQS('isApp')
//        this.cityName = nativeMethods.getQS('cityName')
        if (nativeMethods.getQS('cityName')) {
          this.cityName = nativeMethods.getQS('cityName')
        } else {
          this.cityName = 'default'
        }
        let platform = ''
        let u = navigator.userAgent
//        判断终端 1:android 2:ios',对应显示不同列表
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
          platform = 1
        } else {
          platform = 2
        }
//        console.log(1, u)
        let getListUrl = '/list/' + this.cityName + '/' + this.isApp + '/' + platform
//        let getListUrl = '/list/default/1/2'
        this.$ajax.get(getListUrl)
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data)
              this.list = res.data.data
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 将ues保存在本地中
      saveUser () {
        sessionStorage.setItem('userId', nativeMethods.getQS('userId'))
      },
      toHome () {
        nativeMethods.toHome()
      },
      toLogin () {
        nativeMethods.toLogin()
      },
      toShare () {
//        this.arr = ['shareType', 'url', 'title', 'content', 'shareImageUrl']
//        console.log(this.arr)
        nativeMethods.toShare(this.arr)
      },
      toScan () {
        nativeMethods.toScan()
      },
      goToScanSpecialEvent () {
        nativeMethods.goToScanSpecialEvent()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li img {
    width: 100%;
  }

  #apptest {
    width: 300px;
    height: 100px;
    background: red;
  }

  #apptest1 {
    width: 300px;
    height: 100px;
    background: green;
  }

  #apptest2 {
    width: 300px;
    height: 100px;
    background: blueviolet;
  }

  #apptest3 {
    width: 300px;
    height: 100px;
    background: yellow;
  }

  #apptest4 {
    width: 300px;
    height: 100px;
    background: pink;
  }

  #apptest5 {
    width: 300px;
    height: 100px;
    background: #ccc;
  }

</style>
