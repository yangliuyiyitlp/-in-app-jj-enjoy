<template>
  <div>
    <div class="banner">
      <img :src="detailObj.topImg" alt="">
    </div>

    <div id="logo">
      <div>
        <img :src="detailObj.logoImg" alt="">
        <span>
          <h3 v-text="detailObj.title"></h3>
          <div class="label">
            <ul>
              <li v-for="(item,index) in tagList" :key="index">{{item}}</li>
            </ul>
          </div>
        </span>
      </div>
    </div>

    <span class="remark" v-text="detailObj.secTitle"></span>

    <div class="preview">
      <h4>预览</h4>
      <div class="list">
        <ul>
          <li v-for="(item,index) in list" :key="index"><img :src="item" alt=""></li>
        </ul>
      </div>
    </div>

    <div class="description">
      <h4>应用描述</h4>
      <div v-text="detailObj.description"></div>
      <span>大小：{{detailObj.installSize}}</span>
      <span>版本：{{detailObj.version}}</span>
    </div>

    <div id="footer">
      <div class="btn" @click="download">立即下载</div>
    </div>
  </div>
</template>

<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    name: 'download',
    data () {
      return {
        detailObj: {},
        tagList: [],
        list: [] // 预览图片列表
      }
    },
    created () {
      this.saveData()
      this.getDetail()
    },
    methods: {
      // 获取应用详情
      getDetail () {
        let getDetailUrl = `http://106.15.47.133:8080/jjlx/download/detail/${nativeMethods.getQS('downloadId')}/${sessionStorage.getItem('platform')}`
        // getDetailUrl = 'http://106.15.47.133:8080/jjlx/download/detail/1/1' // dev
        this.$ajax.get(getDetailUrl)
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              this.detailObj = res.data.data
              // this.detailObj.tag = '钢铁侠,蜘蛛侠,蝙蝠侠,钢铁侠,蜘蛛侠'
              this.tagList = this.detailObj.tag.split(',')
              this.list = this.detailObj.revImg.split(';')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 点击下载应用
      download () {
        // 判断用户是否登录,未登录登录
        if (+sessionStorage.getItem('userId') === 0) {
          nativeMethods.toLogin()
        } else {
          // todo 跳转下载 放入地址
          location.href = this.detailObj.downUrl
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
          sessionStorage.setItem('platform', 1)
        } else {
          sessionStorage.setItem('platform', 2)
        }
      }
    },
    watch: {
      list: function () {
        this.$nextTick(() => {
          document.querySelector('.list ul').style.width = (this.list.length * 8) + 'rem'
        })
      }
    }
  }
</script>

<style scoped>
  img {
    border: solid 1px transparent;
  }

  .banner {
    height: 10.5rem;
    width: 100%;
  }

  .banner img {
    height: 100%;
    width: 100%;
  }

  #logo {
    padding: 0 1rem;
    height: 6rem;
  }

  #logo > div {
    position: relative;
    padding: 1rem 0;
    border-bottom: solid 0.1rem #e2e2e2;
  }

  #logo div img {
    display: inline-block;
    vertical-align: top;
    height: 4rem;
    width: 4rem;
    margin-right: 1rem;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
  }

  #logo div span {
    position: absolute;
    top: 1.5rem;
  }

  #logo span > h3 {
    font-size: 1.2rem;
    line-height: 1.2rem;
    color: #2E2E2E;
  }

  #logo span .label {
    height: 1.9rem;
    width: 10rem;
    padding-top: 0.2rem;
  }

  .label li {
    float: left;
    font-size: 0.5rem;
    line-height: 0.5rem;
    color: #fff;
    padding: 0.15rem 0.4rem;
    margin: 0.2rem 0.3rem 0 0;
    -webkit-border-radius: 0.38rem;
    -moz-border-radius: 0.38rem;
    border-radius: 0.38rem;
  }

  .label li:first-child {
    background: #67C2FD;
  }

  .label li:nth-child(2) {
    background: #BC88FB;
  }

  .label li:nth-child(3) {
    background: #FF7F7F;
  }

  .label li:nth-child(4) {
    background: #3DD085;
  }

  .label li:nth-child(5) {
    background: #FF8B2B;
  }

  .remark {
    display: block;
    width: 16.8rem;
    margin: 0.5rem 0 0 1rem;
    font-size: 0.6rem;
    line-height: 0.6rem;
    color: #B5B5B5;
  }

  .preview, .description {
    margin-left: 1rem;
    overflow: hidden;
  }

  h4 {
    margin: 1rem 0 0.6rem 0;
    font-size: 0.9rem;
    color: #4F4D4D;
  }

  .preview .list {
    width: 100%;
    overflow-y: auto;
  }

  .preview ul {
    height: 13.35rem;
  }

  .preview li {
    float: left;
    width: 7.5rem;
    height: 13.35rem;
    margin-right: 0.5rem;
  }

  .preview li img {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 0.3rem;
    -moz-border-radius: 0.3rem;
    border-radius: 0.3rem;
  }

  .description {
    margin-bottom: 4.35rem;
  }

  .description div {
    width: 16.75rem;
    font-size: 0.7rem;
    line-height: 1rem;
    color: #4F4D4D;
    margin-bottom: 0.18rem;
  }

  .description > span {
    display: block;
    width: 16.8rem;
    text-align: right;
    font-size: 0.7rem;
    line-height: 0.7rem;
    color: #AFAFAF;
  }

  #footer {
    position: fixed;
    bottom: 0;
    width: 18.75rem;
    height: 4rem;
    background-color: #fff;
    -webkit-box-shadow: 0 -0.1rem 0.2rem 0 rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 -0.1rem 0.2rem 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 -0.1rem 0.2rem 0 rgba(0, 0, 0, 0.12);
  }

  #footer .btn {
    width: 16.75rem;
    height: 2.5rem;
    margin: 0.75rem 1rem;
    -webkit-border-radius: 2rem;
    -moz-border-radius: 2rem;
    border-radius: 2rem;
    background: linear-gradient(to right, #FD5E33, #F43623);
    color: #fff;
    font-size: 0.9rem;
    line-height: 2.5rem;
    text-align: center;
  }
</style>
