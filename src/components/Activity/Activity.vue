<template>

  <div class="activity">
    <h6 @click="goActivityList">最新活动<i></i></h6>
    <div class="wrap">
      <ul>
        <li v-for="(item, index) in list" @click="goShare(item)" :key="index">
          <img v-lazy="item.img_path">
          <span>活动名称</span>
        </li>
      </ul>
    </div>
  </div>

</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        list: [] // 活动列表
      }
    },
    created () {
      this.getList()
    },
    methods: {
      // 获取活动列表
      getList () {
        let getListUrl = '/ac/list/' + sessionStorage.getItem('cityName') + '/' + sessionStorage.getItem('isApp') + '/' + sessionStorage.getItem('platform')
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
      // 跳转至最新活动列表页面
      goActivityList () {
        this.$router.push({name: 'activity.list'})
      },
      // 跳转到详情页面的同时 触发分享功能
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
  html, body {
    overflow: hidden;
    overflow-y: auto;
  }

  .activity {
    background-color: #fff;
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
    width: 10000%;
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

</style>
