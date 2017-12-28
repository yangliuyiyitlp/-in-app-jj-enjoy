<template>
  <div class="list">
    <!--<div id="apptest5" @click="toShare">shareActivityPlatform</div>-->
    <!--<div id="apptest1" @click="toHome">goToHomeEvent</div>-->
    <!--<div id="apptest2" @click="toScan">toScan</div>-->
    <!--<div id="apptest3" @click="goToScanSpecialEvent">goToScanSpecialEvent</div>-->
    <!--<div id="apptest4" @click="toLogin">gotoLogin</div>-->

    <ul>
      <li v-for="(item, index) in list" @click="goShare(item)">
        <img v-lazy="item.img_path">
      </li>
    </ul>
  </div>
</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
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
      sessionStorage.setItem('ActivityListScrollTop', scrollTop) // 离开活动列表路由时把位置存起来
//      console.log(scrollTop)
      next()
    },
    // 返回该页面时取出scrollTop
    updated () {
      let _this = this
      // 返回同一个位置
      let scrollTop = +sessionStorage.getItem('ActivityListScrollTop') // 返回活动列表页面取出来
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
        let getListUrl = '/ac/list/' + sessionStorage.getItem('cityName') + '/' + sessionStorage.getItem('isApp') + '/' + sessionStorage.getItem('platform')
        getListUrl = '/ac/list/default/1/2'
        this.$ajax.get(getListUrl)
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data.data)
              this.list = res.data.data
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 触发分享功能
      goShare (data) {
//        console.log(data)
        location.href = data.activity_path
//        console.log(data.shareUrl)
//        console.log(data.id)
//        if (data.isSelf === 1) {
//          let str = '?userId=' + this.userId + '&adId=' + data.id + '&isApp=0'
//          data.shareUrl = data.shareUrl + str
//        }
        this.arr = [data.share_platform, data.share_url, data.share_title, data.share_content, data.share_pic]
//        console.log(this.arr)
        nativeMethods.toShare(this.arr)
      }
//      toHome () {
//        nativeMethods.toHome()
//      },
//      toLogin () {
//        nativeMethods.toLogin()
//      },
//      toShare () {
// //        this.arr = [sharePlatform, shareUrl, shareTitle, shareContent, sharePic]
// //        console.log(this.arr)
//        nativeMethods.toShare(this.arr)
//      },
//      toScan () {
//        nativeMethods.toScan()
//      },
//      goToScanSpecialEvent () {
//        nativeMethods.goToScanSpecialEvent()
//      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list {
    background-color: #fff;
  }
ul{
  overflow: hidden;
}
  li {
    float: left;
    margin: 0.75rem 0.75rem 0;
    width: 17.25rem;
    height: 7rem;
  }

  li img {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
  }


</style>
