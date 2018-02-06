<template>
  <div id="detail">
    <div class="top">
      <!--<mt-swipe id="mySwipe" :auto="0">-->
      <mt-swipe id="mySwipe">
        <mt-swipe-item v-for="(item,index) in imgPath2" :key="index">
          <img :src="item" alt="">
        </mt-swipe-item>
      </mt-swipe>

      <div class="welfare">
        <p>{{detailObj.welfareTitle}}</p>
        <ul>
          <li class="left"><b></b><span ref="formatTime"></span></li>
          <li class="right">{{detailObj.welfareSecTitle}}</li>
        </ul>

      </div>

    </div>

    <div class="address" v-show="detailObj.isGoods">
      <div class="title">
        <span class="one"></span>
        <span class="two">地址:</span>
        <span class="three" ref="three">{{detailObj.businessInfo}}</span>
      </div>
      <div></div>
    </div>

    <div class="text">
      <h5>活动说明</h5>
      <p v-html="detailObj.remarks"></p>
    </div>

    <div id="footer">
      <div class="btn" @click="getWelfare">立即领取</div>
    </div>
  </div>
</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        detailObj: {},
        imgPath2: [],
        flag: 1 // 控制按钮是否可点击
      }
    },
    created () {
      // 当是从原生的跳转进来才执行
      if (location.href.indexOf('userId') !== -1) {
        this.saveData()
      }
      this.getDetail()
      this.getInit()
    },
    methods: {
      // 初始化信息 按钮
      getInit () {
        // todo 登录才调用
        if (+sessionStorage.getItem('userId') !== 0) {
          // let url = `wc/init/${sessionStorage.getItem('userId')}/${this.$route.query.adId}`
          let url = `wc/init/${sessionStorage.getItem('userId')}/${nativeMethods.getQS('adId')}`
//        /wc/init/{userId}/{welfareId}
          this.$ajax.get(url)
            .then(res => {
//              console.log(res.data)
              let btnBox = document.querySelector('#footer .btn')
              if (res.data.code === 200) {
//                "msg":"成功" 可以正常领取
                btnBox.innerText = '立即领取'
                btnBox.style.background = 'linear-gradient(to right, #FD5E33, #F43623)'
                this.flag = 1
              } else {
                this.flag = 0
                btnBox.style.background = '#BBBBBB'
                if (res.data.code === 501) {
//                "msg":"活动结束"
                  btnBox.innerText = res.data.msg
                } else if (res.data.code === 502) {
//                  "msg":"已领完"
                  btnBox.innerText = res.data.msg
                } else if (res.data.code === 503) {
//                  "msg":"总领取次数用完"
                  btnBox.innerText = res.data.msg
                } else if (res.data.code === 504) {
//                  "msg":"当天次数用完"
                  btnBox.innerText = res.data.msg
                } else if (res.data.code === 111) {
//                  "msg":"即将开始"
                  btnBox.innerText = res.data.msg
                }
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          // 未登录状态
          this.flag = 1
          let btnBox = document.querySelector('#footer .btn')
          btnBox.innerText = '立即领取'
          btnBox.style.background = 'linear-gradient(to right, #FD5E33, #F43623)'
        }
      },
      // 获取详情信息
      getDetail () {
//        /wc/detail/{id}
//         let getDetailUrl = `ac/detail/${this.$route.query.adId}/${sessionStorage.getItem('isApp')}`
        let getDetailUrl = `ac/detail/${nativeMethods.getQS('adId')}/${sessionStorage.getItem('isApp')}`
        // getDetailUrl = '/ac/detail/1b6064c2dfbf460c822d03a045de8200/1'
        this.$ajax.get(getDetailUrl)
          .then(res => {
//            console.log(res.data)
            if (res.data.code === 200) {
              this.detailObj = res.data.data
//              console.log(this.detailObj)
              // 获取轮播图列表 最后一个若为逗号 截去最后逗号
              let str = this.detailObj.imgPath2
              if (str[str.length - 1] === ',') {
                str = str.substring(0, str.length - 1)
              }
              if (str.indexOf(',') === -1) {
                // 不含有, 说明只有一张图
                this.imgPath2[0] = str
              } else {
                // 轮播图
                this.imgPath2 = str.split(',')
              }
            }
          })
          .then(() => {
            this.formatData()
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 用户点击获取福利
      getWelfare () {
        // 判断用户是否登录
        // 只判断list进来未登录
        if (+sessionStorage.getItem('userId') === 0) {
          // 未登录去登录
          nativeMethods.toLogin()
        } else {
          // 已经登录获取福利
          if (this.flag) {
            this.joinWelfare()
//            console.log(this.detailObj.id)
          }
        }
      },
      // todo 参与领取优惠券的多种逻辑
      joinWelfare () {
        // todo 根据返回的code做判断
//        /wc/join/{userId}/{welfareId}
        this.$ajax.post(`wc/join`, {
          'userId': sessionStorage.getItem('userId'),
          'welfareId': nativeMethods.getQS('adId')
//          'welfareId': '09a100377ca8441d8d62cf6333e42cca'
        })
          .then(res => {
//            console.log(res.data)
            let btnBox = document.querySelector('#footer .btn')
            if (res.data.code === 409 || res.data.code === 200) {
              this.flag = 1
              btnBox.innerText = '立即领取'
              btnBox.style.background = 'linear-gradient(to right, #FD5E33, #F43623)'
              if (res.data.code === 409) {
//                "msg":"领取成功，今天还可以领取x-1次哦~"
                this.$toast({
                  message: res.data.msg
                })
              } else if (res.data.code === 200) {
//                "msg":"成功"
                this.toast('领取成功')
              }
            } else {
              this.flag = 0
              btnBox.style.background = '#BBBBBB'
              if (res.data.code === 501) {
//              "msg":"活动结束"
                btnBox.innerText = res.data.msg
                this.toast(res.data.msg)
              } else if (res.data.code === 403) {
//              "msg":"信用积分不足"
                btnBox.innerText = res.data.msg
                this.toast(res.data.msg)
              } else if (res.data.code === 505) {
//              "msg":"取成功，今日领取结束，明天再来吧!"
                btnBox.innerText = '已领取'
                this.toast(res.data.msg)
              } else if (res.data.code === 503) {
//                  "msg":"领取成功，且领取总次数用完"
                this.toast(res.data.msg)
                btnBox.innerText = '已领取'
              } else if (res.data.code === 502) {
//                  "msg":"已领完"
                this.toast(res.data.msg)
                btnBox.innerText = res.data.msg
              }
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 弹框
      toast (msg) {
        this.$toast({
          message: msg
        })
      },
      // 根据businessInfo的长度给定不同的样式
      changeStyle () {
//          if (!this.detailObj.isGoods) {
//            document.querySelector('.text').style.marginTop = '1.1rem'
//          }
        let textBox = document.querySelector('.text')
        let addressBox = document.querySelector('.address')
        // isGoods为0时候 为虚拟没有地址
        if (+this.detailObj.isGoods === 0) {
          textBox.style.marginTop = '1.1rem'
        }
        if (this.$refs.three.clientHeight && this.$refs.three.clientHeight / 20 < 1) {
          addressBox.style.height = '7rem'
          textBox.style.marginTop = '3.45rem'
        }
        if (this.$refs.three.clientHeight / 20 > 1) {
          addressBox.style.height = '8.15rem'
          textBox.style.marginTop = '4.6rem'
        }
      },
      // 格式化倒计时时间
      formatData () {
        let t = parseInt(+this.detailObj.endTime - (+new Date()))
        let btnBox = document.querySelector('#footer .btn')
        let spanBox = document.querySelector('.left span')
//        t = 0
        // 活动结束 按钮显示已结束
        if (t <= 0) {
          spanBox.innerText = ''
          if (+sessionStorage.getItem('userId') === 0) {
            btnBox.innerText = '活动结束'
            btnBox.style.background = '#BBBBBB'
            this.flag = 0
          }
        } else if (t > 0) {
          let minutes = Math.floor((t / 1000 / 60) % 60)
          let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
          let days = Math.floor(t / (1000 * 60 * 60 * 24))
          let str = days + '天' + hours + '小时' + minutes + '分'
          spanBox.innerText = str
        } else {
          this.formatData()
        }
      },
      // 从原生直接进入 获取查询字符串中useId isApp存储本地
      saveData () {
        if (!sessionStorage.getItem('userId')) {
          sessionStorage.setItem('userId', '0')
        }
        sessionStorage.setItem('isApp', nativeMethods.getQS('isApp'))
        if (nativeMethods.getQS('userId') && +nativeMethods.getQS('userId') !== 0) {
          sessionStorage.setItem('userId', nativeMethods.getQS('userId'))
        }
        //        判断终端 1:android 2:ios',对应显示不同列表
        let u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
          sessionStorage.setItem('platform', '1')
        } else {
          sessionStorage.setItem('platform', '2')
        }
      }
    },
    watch: {
      detailObj: function () {
        this.$nextTick(() => {
          // 根据businessInfo的长度给定不同的样式
          this.changeStyle()
          // 格式化倒计时时间
          this.formatData()
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #detail {
    margin: 0.5rem 0.75rem;
    position: relative;
    width: 17.25rem;
  }

  .top {
    position: relative;
    height: 13rem;
    z-index: 9;
    -webkit-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
    overflow: hidden;
  }

  #mySwipe {
    height: 8.5rem;
  }

  #mySwipe img {
    width: 100%;
    height: 100%;
  }

  .welfare {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 4.5rem;
    padding: 0.65rem 0.75rem 0;
    letter-spacing: 0;
  }

  .welfare p {
    height: 1.55rem;
    font-size: 1.2rem;
    color: rgba(77, 78, 79, 1);
    line-height: 1.55rem;

  }

  .welfare ul {
    position: absolute;
    height: 0.95rem;
    width: 15.75rem;
    bottom: 0.75rem;
    color: rgba(130, 130, 130, 1);
  }

  .welfare ul li {
    position: absolute;
    height: 0.95rem;
    font-size: 0.7rem;
    line-height: 0.95rem;
    display: inline-block;
  }

  li.right {
    right: 0;
  }

  .welfare .left span {
    margin-left: 0.95rem;

  }

  .welfare b {
    position: absolute;
    width: 0.65rem;
    height: 0.75rem;
    background: url('../../assets/img/time.png') no-repeat;
    background-size: 100% 100%;
    top: -1px;
  }

  .address {
    width: 100%;
    height: 7rem;
    background-color: #FDFDFD;
    position: absolute;
    top: 8.5rem;
    -webkit-box-shadow: 0 0.1rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0.1rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.1rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    -webkit-border-radius: 0 0 0.6rem 0.6rem;
    -moz-border-radius: 0 0 0.6rem 0.6rem;
    border-radius: 0 0 0.6rem 0.6rem;
  }

  .address .title {
    position: absolute;
    top: 5.3rem;
    bottom: 0.6rem;
    font-size: 0.7rem;
    line-height: 0.95rem;
  }

  .address span {
    /*position: absolute;*/
    float: left;
  }

  .address .one {
    position: absolute;
    width: 0.65rem;
    height: 0.8rem;
    background: url('../../assets/img/address .png') no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
    left: 0.7rem;
  }

  .address .two {
    text-indent: 1.8rem;
    color: #4D4E4F;
  }

  .address .three {
    padding-left: 0.45rem;
    color: #828282;
    width: 12.6rem;
  }

  .text {
    margin: 3.6rem 0.4rem 3.5rem 0.35rem;
  }

  .text h5 {
    color: #4D4E4F;
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.05rem;
    margin-bottom: 0.3rem;
  }

  .text p {
    font-size: 0.7rem;
    color: #828282;
    line-height: 1.05rem;
  }

  #footer {
    position: fixed;
    width: 100%;
    height: 3.5rem;
    background: rgba(255, 255, 255, 1);
    left: 0;
    bottom: 0;
  }

  #footer .btn {
    width: 16.75rem;
    height: 2rem;
    border-radius: 1rem;
    background: linear-gradient(to right, #FD5E33, #F43623);
    text-align: center;
    margin: 0.75rem 1rem;
    color: #fff;
    font-size: 0.9rem;
    line-height: 2rem;
    -webkit-box-shadow: 0 0.3rem 0.5rem 0 rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0 0.3rem 0.5rem 0 rgba(0, 0, 0, 0.22);
    box-shadow: 0 0.3rem 0.5rem 0 rgba(0, 0, 0, 0.22);
  }
</style>
