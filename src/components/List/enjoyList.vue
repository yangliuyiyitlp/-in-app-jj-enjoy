<template>
  <div class="list">
    <div id="apptest" @click="toShare">shareActivityPlatform</div>
    <div id="apptest1" @click="toLogin">toLogin</div>
    <div id="apptest2" @click="toScan">toScan</div>
    <div id="apptest3" @click="goToScanSpecialEvent">goToScanSpecialEvent</div>

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
        list: []
      }
    },
    created () {
      this.getList()
    },
//    beforeRouteLeave (to, from, next) {
//      console.log(1)
//      let position = window.scrollY()
//      this.$store.commit('SAVE_POSITION', position) // 离开路由时把位置存起来
//      next()
//    },
    updated () {
      this.$nextTick(function () {
        let position = this.$store.state.position // 返回页面取出来
        window.scroll(0, position)
        console.log(position)
      })
    },
    methods: {
      getList () {
        let city
        if (this.getQS('adId')) {
          city = this.getQS('adId')
        } else {
          city = '上海'
        }
        this.$ajax.get(city)
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
        let url = location.href
        let paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
        let paraObj = {}
        for (let i = 0, j = paraString[i]; i < paraString.length; i++) {
          paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length)
        }
        let returnValue = paraObj[paras.toLowerCase()]
        if (typeof (returnValue) === 'undefined') {
          return ''
        } else {
          return decodeURIComponent(returnValue)
        }
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

</style>
