<template>
  <div class="list">
    <p>adId---{{adId}}</p>
    <p>userId---{{userId}}</p>
    <p>isApp---{{isApp}}</p>
    <div id="apptest" @click="toShare">shareActivityPlatform</div>
  </div>
</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        adId: '',
        userId: '',
        isApp: '',
        arr: []
      }
    },
    created () {
      this.userId = this.getQS('userId')
      this.isApp = this.getQS('isApp')
      this.cityName = this.getQS('cityName')
      this.getDetail()
    },
    methods: {
      getDetail () {
//        /detail/{adId}/{userId}/{isApp}
//        let getDetailUrl = '/detail/' + this.adId + '/' + this.userId + '/' + this.isApp
        let getDetailUrl = '/detail/2c94bf815aa65346015aa66428cb0161/1'
        this.$ajax.get(getDetailUrl)
          .then(res => {
            if (res.data.code === 200) {
              let obj = res.data.data
              console.log(obj)
              this.arr = ['1,2,3', obj.shareUrl, obj.shareTitle, obj.shareContent, obj.sharePic]
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
//        this.arr = ['shareType', 'url', 'title', 'content', 'shareImageUrl']
        nativeMethods.toShare(this.arr)
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
//        let url = 'https://www.baidu.com/s?userId=tom&isApp=1&cityName=shanghai'
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
