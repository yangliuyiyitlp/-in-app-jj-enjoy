<template>

  <div class="activity">
    <h6>赳赳特选</h6>

    <div id="chosen">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="goDetail(item)">
          <img v-lazy="item.imagePath" alt="">
          <span class="middle">
          <p class="info">{{item.welfare_title}}</p>
          <p class="time">{{item.timeStr}}</p>
          </span>
          <span class="right">{{item.btnStr}}</span>
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
      // 获取混合列表
      getList () {
//        /common/lx/{cityName}/{isApp}/{os}
        let getListUrl = `/common/lx/${sessionStorage.getItem('cityName')}/${sessionStorage.getItem('isApp')}/${sessionStorage.getItem('platform')}`
        // getListUrl = `/common/lx/default/1/2`
        this.$ajax.get(getListUrl)
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data.data)
              this.list = res.data.data
              for (let i = 0; i < this.list.length; i++) {
                // 如果里面有逗号,去掉
                if (this.list[i].activity_path.indexOf('welfare/detail') !== -1) {
                  this.list[i].imagePath = this.list[i].img_path
                } else {
                  this.list[i].imagePath = this.list[i].img_path2
                }
                if (this.list[i].imagePath.indexOf(',') !== -1) {
                  let imgArr = []
                  let imgArrList = this.list[i].imagePath.split(',')
                  for (let j = 0; j < imgArrList.length; j++) {
                    if (imgArrList[j]) {
                      imgArr.push(imgArrList[j])
                    }
                  }
                  this.list[i].imagePath = imgArr[0]
                }
                // 转化时间格式
                this.list[i].beginMonth = new Date(parseInt(this.list[i].begin_time)).getMonth() + 1 + '月'
                this.list[i].beginDate = new Date(parseInt(this.list[i].begin_time)).getDate() + '日'
                this.list[i].endMonth = new Date(parseInt(this.list[i].end_time)).getMonth() + 1 + '月'
                this.list[i].endDate = new Date(parseInt(this.list[i].end_time)).getDate() + '日'
                this.list[i].timeStr = this.list[i].beginMonth + this.list[i].beginDate + '-' + this.list[i].endMonth + this.list[i].endDate
                if (+this.list[i].activity_path.indexOf('welfare/detail') !== -1) {
                  this.list[i].btnStr = '马上领取'
                } else {
                  this.list[i].btnStr = '马上参与'
                }
              }
              console.log(this.list)
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 去详情页面
      goDetail (data) {
        console.log(data)
        // 路由包含福利的
        if (data.activity_path.indexOf('welfare/detail') !== -1) {
          // 福利
          this.goWelfare(data)
        } else {
          this.goActivity(data)
        }
      },
      // 福利
      goWelfare (data) {
        location.href = data.activity_path
      },
      // 活动
      goActivity (data) {
        // console.log('goActivity')
        this.goShare(data)
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
    },
    watch: {
      list: function () {
        this.$nextTick(() => {
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].btnStr === '马上领取') {
              document.querySelectorAll('span.right')[i].setAttribute('class', 'right getBtn')
            } else {
              document.querySelectorAll('span.right')[i].setAttribute('class', 'right joinBtn')
            }
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .activity {
    width: 100%;
    background-color: #fff;
    margin-top: 0.5rem;
  }

  h6 {
    font-size: 1rem;
    font-weight: 700;
    color: #4D4E4F;
    height: 1.3rem;
    line-height: 1.3rem;
    padding: 0.5rem 0 0.25rem 1rem;
  }

  #chosen, #chosen ul {
    width: 100%;
  }

  #chosen li {
    padding: 0.5rem 1rem 0.5rem 1rem;
    width: 16.75rem;
    height: 2.8rem;
    border-bottom: 0.03rem solid #E2E2E2;
  }

  #chosen li img {
    float: left;
    display: inline-block;
    width: 4rem;
    height: 2.8rem;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    border-radius: 0.4rem;
  }

  #chosen li span {
    float: left;
  }

  #chosen .middle {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 9.25rem;
    padding: 0.3rem 0 0 0.5rem;
  }

  #chosen li .info {
    color: #4D4E4F;
    font-size: 0.7rem;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
  }

  #chosen li .time {
    color: #BBBBBB;
    font-size: 0.6rem;
    height: 0.85rem;
    line-height: 0.85rem;
    margin-top: 0.1rem;
  }

  li .right {
    margin-top: 0.9rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    float: right;
    width: 3.5rem;
    height: 1.4rem;
    -webkit-border-radius: 0.75rem;
    -moz-border-radius: 0.75rem;
    border-radius: 0.75rem;
    font-size: 0.6rem;
    line-height: 1.4rem;
    text-align: center;
  }

  .getBtn {
    color: #ff6161;
    border: 1px solid #ff6161;
  }

  .joinBtn {
    color: #009BE5;
    border: 1px solid #009BE5;
  }
</style>
