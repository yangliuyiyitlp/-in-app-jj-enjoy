<template>

  <div class="ads">
    <!--<mt-swipe id="mySwipe" :auto="0">-->
    <mt-swipe id="mySwipe">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <div @click="goShare(item)">
          <img :src="item.carousel_img" alt="">
        </div>
      </mt-swipe-item>
    </mt-swipe>
    <div id="target">
      <span class="one" @click="goWelfareList">
        <img src="../../assets/img/path1.png" alt="">
        <p>享优惠</p>
      </span>
      <span class="two" @click="goActivityList">
        <img src="../../assets/img/path2.png" alt="">
         <p>赳福利</p>
      </span>
    </div>
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
        let getListUrl = `/ac/carousel/${sessionStorage.getItem('cityName')}/${sessionStorage.getItem('isApp')}/${sessionStorage.getItem('platform')}`
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
      // 跳转至赳福利(最新活动)列表页面
      goActivityList () {
        this.$router.push({name: 'activity.list'})
      },
      // 跳转至享优惠(福利)列表页面
      goWelfareList () {
        this.$router.push({name: 'welfare.list'})
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
    background-color: #fff;
  }

  #mySwipe {
    margin: 0.75rem 1rem;
    width: 16.75rem;
    height: 7.5rem;
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
    height: 7.5rem;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
  }

  #target {
    padding: 0 2.9rem 0.55rem;
    font-size: 0;
  }

  #target span {
    display: inline-block;
    width: 4.7rem;
    height: 4.7rem;
  }

  #target img {
    width: 100%;
  }

  #target p {
    font-size: 0.7rem;
    color: #4D4E4F;
    text-align: center;
    height: 0.95rem;
    margin: -0.2rem 0 0.55rem;
  }

  #target .two {
    float: right;
  }
</style>
