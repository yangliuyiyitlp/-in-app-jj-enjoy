<template>
  <div class="welfare">
    <h6 @click="goWelfareList">赳赳福利<i></i></h6>
    <ul>
      <li v-for="(item, index) in welfareList"  @click="goWelfareDetail(item)" :key="item.id">
        <img v-lazy="item.img_path">
        <span class="shopTitle">{{item.welfare_title}}</span>
        <span class="shopLimit">{{item.welfare_sec_title}}</span>
      </li>
    </ul>
  </div>
</template>


<script>
  //  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        welfareList: []
      }
    },
    created () {
      this.getWelfare()
    },
    methods: {
      // 获取福利首页列表
      getWelfare () {
        //  /wc/index/{cityName}/{isApp}
        let getListUrl = '/wc/index/' + sessionStorage.getItem('cityName')
        this.$ajax.get(getListUrl)
          .then(res => {
            if (res.data.code === 200) {
//              console.log(res.data.data)
              this.welfareList = res.data.data
//              console.log(this.welfareList)
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 去商家福利详情页面
      goWelfareDetail (data) {
        this.$router.push({name: 'welfare.detail', params: {id: data.id}})
      },
      // 跳转至福利列表页面
      goWelfareList () {
        this.$router.push({name: 'welfare.list'})
      }
//      // 触发分享功能
//      goShare (data) {
// //        console.log(data)
//        location.href = data.activity_path
// //        console.log(data.shareUrl)
// //        console.log(data.id)
// //        if (data.isSelf === 1) {
// //          let str = '?userId=' + this.userId + '&adId=' + data.id + '&isApp=0'
// //          data.shareUrl = data.shareUrl + str
// //        }
//        this.arr = [data.share_platform, data.share_url, data.share_title, data.share_content, data.share_pic]
// //        console.log(this.arr)
//        nativeMethods.toShare(this.arr)
//      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  div {
    background-color: #fff;
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
