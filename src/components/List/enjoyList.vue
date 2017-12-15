<template>
  <div class="list">
    <p>userId---{{userId}}</p>
    <p>isApp---{{isApp}}</p>
    <p>cityName---{{cityName}}</p>
    <a href="http://99company.99bicycle.com:9002/ElectricBicycleActivity/dist/index.html#/enjoydetail">
      <div id="apptest" @click="toShare">跳转详情试试</div>
    </a>
    <!--<div id="apptest" @click="toShare">shareActivityPlatform</div>-->
    <div id="apptest1" @click="toHome">goToHomeEvent</div>
    <div id="apptest2" @click="toScan">toScan</div>
    <div id="apptest3" @click="goToScanSpecialEvent">goToScanSpecialEvent</div>
    <div id="apptest4" @click="toLogin">gotoLogin</div>

    <ul>
      <li v-for="(item, index) in list">
        <a :href='item.activityPath'>
          <img :src='item.imgPath' alt="">
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
      this.getList()
    },
    beforeRouteLeave (to, from, next) {
      window.sessionStorage.setItem('scrollTop', this.getScrollTop.scrollTop) // 离开路由时把位置存起来
      next()
    },
    updated () {
      let _this = this
      // 返回同一个位置
      let scrollTop = +window.sessionStorage.getItem('scrollTop') // 返回页面取出来
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
      getList () {
        this.userId = this.getQS('userId')
        this.isApp = this.getQS('isApp')
        if (this.getQS('cityName')) {
          this.cityName = this.getQS('cityName')
        } else {
          this.cityName = '上海'
        }
//        /list/{cityName}/{userId}/{isApp}
//        /detail/{adId}/{userId}/{isApp}
//        let getListUrl = '/list/' + this.cityName + '/' + this.isApp
        let getListUrl = '/list/shanghai/1'
        this.$ajax.get(getListUrl)
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data)
              this.list = res.data.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      toHome () {
        nativeMethods.toHome()
      },
      toLogin () {
        nativeMethods.toLogin()
      },
      toShare () {
        nativeMethods.toShare()
      },
      toScan () {
        nativeMethods.toScan()
      },
      goToScanSpecialEvent () {
        nativeMethods.goToScanSpecialEvent()
      },
      // 获取地址栏参数
      getQS: (paras) => {
        console.log('getQueryString')
//        let url = location.href
        let url = 'http://99company.99bicycle.com:9002/ElectricBicycleActivity/dist/index.html#/enjoylist?userId=0&isApp=1&cityName=上海市'
        let paraArr = url.substring(url.indexOf('?') + 1, url.length).split('&')
        let paraObj = {}
        for (let i = 0; i < paraArr.length; i++) {
          paraObj[paraArr[i].split('=')[0].toLowerCase()] = paraArr[i].split('=')[1]
        }
        let returnValue = paraObj[paras.toLowerCase()]
        if (typeof (returnValue) === 'undefined') {
          return ''
        } else {
          return decodeURIComponent(returnValue)
        }
      },
      getScrollTop: () => {
        let scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        return scrollTop
      }
    },
    computed: {
//      getScrollTop () {
//        let scrollTop = 0
//        if (document.documentElement && document.documentElement.scrollTop) {
//          scrollTop = document.documentElement.scrollTop
//        } else if (document.body) {
//          scrollTop = document.body.scrollTop
//        }
//        window.sessionStorage.setItem('scrollTop', scrollTop)
//        console.log(scrollTop)
//        return scrollTop
//      }
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

</style>
