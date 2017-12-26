<template>
  <div>
    <mt-swipe :show-indicators="false" id="mySwipe" :auto="0">
      <mt-swipe-item v-for="item in list" :key="item.id">
        <a :href="item.activity_path">
          <img :src="item.img_path" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <h1>最新活动部分</h1>


    <h1>赳赳福利</h1>


  </div>
</template>


<script>
  //  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        userId: '',
        list: []
      }
    },
    created () {
      this.getCarousel()
      this.userId = sessionStorage.getItem('userId')
    },
    methods: {
      // 获取轮播图相关
      getCarousel () {
        this.$ajax.get('/ac/carousel')
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data.data)
              this.list = res.data.data
            }
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #mySwipe {
    height: 200px;
  }
</style>
