<template>

  <div class="ads">

    <!--{{childMsg.cityName}}-->
    <!--<mt-swipe id="mySwipe" :auto="0">-->
    <mt-swipe id="mySwipe">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <div @click="goShare(item)">
          <img :src="item.carousel_img" alt="">
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>

</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        list: [] // 广告轮播图
      }
    },
    created () {
      this.getCarousel()
    },
    methods: {
      // 获取广告轮播图相关
      getCarousel () {
//        /ac/carousel/{cityName}/{isApp}/{os}
        let getListUrl = '/ac/carousel/' + sessionStorage.getItem('cityName') + '/' + sessionStorage.getItem('isApp') + '/' + sessionStorage.getItem('platform')
//        getListUrl = '/ac/carousel/sh/1/1'
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
      // 触发分享功能
      goShare (data) {
//        console.log(data)
        location.href = data.activity_path
        if (data.sharePlatform === null) {
          data.sharePlatform = ''
        }
        this.arr = [data.share_platform, data.share_url, data.share_title, data.share_content, data.share_pic]
//        console.log(this.arr)
        nativeMethods.toShare(this.arr)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .ads {
    padding: 0.75rem 0.75rem 1.05rem;
    background-color: #fff;
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
    overflow: hidden;
  }

  #mySwipe img, #mySwipe div {
    width: 100%;
    height: 7rem;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
  }

  /*#mySwipe .mint-swipe-item {*/
    /*-webkit-border-radius: 0.6rem;*/
    /*-moz-border-radius: 0.6rem;*/
    /*border-radius: 0.6rem;*/
  /*}*/

</style>
