<template>
  <div id="welfareList">
    <ul>
      <li v-for="item in list" :key="item.id" @click="shopDetail(item.id)">
        <img v-lazy="item.img_path">
        <span class="shopTitle">{{item.welfare_titile}}</span>
        <span class="shopLimit">{{item.welfare_sec_title}}</span>
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
//      this.saveUser()
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
      // 获取赳赳福利列表
      getList () {
        this.userId = nativeMethods.getQS('userId')
        this.isApp = nativeMethods.getQS('isApp')
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
//        /wc/list/{cityName}/{isApp}/{os}
        let getListUrl = '/wc/list/' + this.cityName + '/' + this.isApp + '/' + platform
        getListUrl = '/wc/list/sh/0/1'
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
      // 去商家福利详情页面
      shopDetail (id) {
//        console.log(id)
        this.$router.push({name: 'welfare.detail', params: {id: id}})
      },
      // 将ues保存在本地中
      saveUser () {
        sessionStorage.setItem('userId', nativeMethods.getQS('userId'))
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
  #welfareList {
    background-color: #fff;
    padding-top: 1rem;
  }

  ul {
    overflow: hidden;
  }

  li {
    float: left;
    width: 8.25rem;
    height: 11rem;
    margin-bottom: 0.75rem;
    margin-left: 0.75rem;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
    overflow: hidden;
    -webkit-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.1);
  }

  li img {
    width: 8.25rem;
    height: 8.25rem;
  }

  span {
    display: block;
    margin-left: 0.5rem;
    text-align: left;
  }

  .shopTitle {
    margin-top: 0.35rem;
    font-size: 0.7rem;
    color: #4D4E4F;
  }

  .shopLimit {
    margin-top: 0.1rem;
    font-size: 0.6rem;
    color: #bbb;
  }

</style>
