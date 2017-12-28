<template>
  <div id="home">

    <!--<div class="ads">-->
    <!--<mt-swipe id="mySwipe" :auto="0">-->
    <!--<mt-swipe-item v-for="item in list" :key="item.id">-->
    <!--<a :href="item.activity_path">-->
    <!--<img :src="item.img_path" alt="">-->
    <!--</a>-->
    <!--</mt-swipe-item>-->
    <!--</mt-swipe>-->
    <!--</div>-->

    <ads></ads>

    <!--<div class="activity">-->
    <!--<h6>最新活动<i></i></h6>-->
    <!--<div class="wrap">-->
    <!--<ul>-->
    <!--<li v-for="(item, index) in list" @click="goShare(item)">-->
    <!--<img v-lazy="item.img_path">-->
    <!--<span>活动名称</span>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->

    <activity></activity>

    <!--<div class="welfare">-->
    <!--<h6>赳赳福利<i></i></h6>-->
    <!--<ul>-->
    <!--<li v-for="(item, index) in welfareList" @click="goShare(item)">-->
    <!--<img v-lazy="item.img_path">-->
    <!--<span class="shopTitle">{{item.welfare_titile}}</span>-->
    <!--<span class="shopLimit">{{item.welfare_sec_title}}</span>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->

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
        userId: '',
        isApp: '',
        cityName: '',
        list: [],
        welfareList: []
      }
    },
    created () {
      // 将ues保存在本地中
      this.saveUser()
      this.getList()
      this.getCarousel()
      this.getWelfare()
      this.userId = sessionStorage.getItem('userId')
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
      // 获取轮播图相关
      getCarousel () {
        this.$ajax.get('/ac/carousel')
          .then(res => {
            if (res.data.code === 200) {
//              console.log(res.data.data)
              this.list = res.data.data
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 获取活动列表
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
        let getListUrl = '/ac/list/' + this.cityName + '/' + this.isApp + '/' + platform
        getListUrl = '/ac/list/default/1/2'
        this.$ajax.get(getListUrl)
          .then(res => {
            if (res.data.code === 200) {
//              console.log(res.data.data)
              this.list = res.data.data
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 获取福利首页列表
      getWelfare () {
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
        //  /wc/index/{cityName}/{isApp}/{os}
        let getListUrl = '/wc/index/' + this.cityName + '/' + this.isApp + '/' + platform
        getListUrl = '/wc/index/default/0/1'
        this.$ajax.get(getListUrl)
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              console.log(res.data.data)
              this.welfareList = res.data.data
              console.log(this.welfareList)
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body {
    overflow: hidden;
    overflow-y: auto;
  }

  #home {
    background-color: #F9F9F9;
  }

  #home > div {
    background-color: #fff;
  }

  .ads {
    padding: 0.75rem 0.75rem 1.05rem;
  }

  #mySwipe {
    width: 17.25rem;
    height: 7rem;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
    -webkit-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.25);
    box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.25);
  }

  #mySwipe img {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
  }

  .activity {
    margin: 0.5rem 0;
  }

  h6 {
    font-size: 1.2rem;
    font-weight: 700;
    color: #4D4E4F;
    height: 1.65rem;
    line-height: 1.65rem;
    padding: 0.95rem 0.45rem 0.5rem 0.75rem;
  }

  i {
    display: inline-block;
    float: right;
    width: 1.2rem;
    height: 1.2rem;
    background: url('../../assets/img/gomore.png') no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }

  .activity .wrap {
    width: 100%;
    overflow-y: auto;
  }

  .activity ul {
    width: 1000%;
  }

  .activity ul li {
    float: left;
    margin-left: 0.75rem;
  }

  .activity ul img {
    width: 7.5rem;
    height: 7.5rem;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
    -webkit-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.35);
    -moz-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.35);
    box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.35);
  }

  .activity ul span {
    display: block;
    padding: 0.55rem 0 0.75rem;
    height: 1rem;
    font-size: 0.7rem;
    color: rgba(130, 130, 130, 1);
    line-height: 1rem;
  }

  .welfare li {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 9rem;
    float: left;
    padding-left: 0.75rem;
    margin-bottom: 0.65rem;
  }

  .welfare li img {
    display: block;
    width: 8.25rem;
    height: 8.25rem;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
  }

  .welfare .shopTitle {
    display: block;
    margin: 0.6rem 0 0.1rem;
    height: 1rem;
    font-size: 0.7rem;
    color: rgba(77, 78, 79, 1);
    line-height: 1rem;
  }

  .welfare .shopLimit {
    display: block;
    height: 0.85rem;
    font-size: 0.6rem;
    color: rgba(187, 187, 187, 1);
    line-height: 0.85rem;
  }

</style>
