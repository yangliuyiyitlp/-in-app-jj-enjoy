<template>
  <div id="detail">
    <div class="top">
      <mt-swipe id="mySwipe" :auto="0">
        <mt-swipe-item v-for="(item,index) in imgPath2" :key="index">
          <img :src="item" alt="">
        </mt-swipe-item>
      </mt-swipe>

      <div class="welfare">
        <p>美丽的商家满100减50</p>
        <span class="left"><b></b><span>3天12小时23分</span></span>
        <span class="right">每人只限1张</span>
      </div>

    </div>

    <div class="address" v-show="detailObj.businessInfo">
      <div class="title">
        <span class="one"></span>
        <span class="two">地址:</span>
        <span class="three">{{detailObj.businessInfo}}</span>
      </div>
      <div></div>
    </div>

    <div class="text">
      <h5>活动说明</h5>
      <p>{{detailObj.description}}
        <!--微软雅黑是美国微软公司委托中国北大方正电子有限公司设计的一款全面支持ClearType技术的字体。-->
        <!--Monotype公司负责字体Hinting工作。它属于OpenType类型，文件名是MSYH.TTF，字体设计上属于无衬线字体和黑体。-->
        <!--这种字体每个字的造价成本在100美元左右。该字体家族还包括“微软雅黑Bold”（粗体），文件名为MSYHBD.TTF。-->
        <!--这个粗体不是单纯的将普通字符加粗，而是在具体笔画上分别进行处理，因此是独立的一个字体。微软雅黑随简体中文版Windows Vista一起发布，-->
        <!--是Windows Vista默认字体。另外，Microsoft Office 2007简体中文版也附带这个字体。-->
        <!--当使用于不能显示中文字型名称的系统时，会显示为Microsoft YaHei-->
        <!--Monotype公司负责字体Hinting工作。它属于OpenType类型，文件名是MSYH.TTF，字体设计上属于无衬线字体和黑体。-->
        <!--这种字体每个字的造价成本在100美元左右。该字体家族还包括“微软雅黑Bold”（粗体），文件名为MSYHBD.TTF。-->
        <!--这个粗体不是单纯的将普通字符加粗，而是在具体笔画上分别进行处理，因此是独立的一个字体。微软雅黑随简体中文版Windows Vista一起发布，-->
        <!--是Windows Vista默认字体。另外，Microsoft Office 2007简体中文版也附带这个字体。-->
        <!--当使用于不能显示中文字型名称的系统时，会显示为Microsoft YaHei-->
      </p>
    </div>

    <div id="footer">
      <div class="btn">立即领取</div>
    </div>
  </div>
</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        userId: '',
        isApp: '',
        arr: [],
        detailObj: {},
        imgPath2: []
      }
    },
    created () {
      this.userId = sessionStorage.getItem('userId')
      this.isApp = nativeMethods.getQS('isApp')
      this.getDetail()
    },
    methods: {
      getDetail () {
//        /wc/detail/{id}
//        console.log(this.$route.params.id)
        let getDetailUrl = '/wc/detail/' + this.$route.params.id
        getDetailUrl = '/wc/detail/09a100377ca8441d8d62cf6333e42cca'
        this.$ajax.get(getDetailUrl)
          .then(res => {
//            console.log(res.data)
            if (res.data.code === 200) {
              this.detailObj = res.data.data
//              console.log(this.detailObj.imgPath2)
              this.imgPath2 = this.detailObj.imgPath2.split(',')
//              console.log(this.imgPath2)
              console.log(this.detailObj)
              this.detailObj.businessInfo = '一二三五五六七八八七七八七八七八八'
              // 商家地址没有时 隐藏address
              if (!this.detailObj.businessInfo) {
                console.log(document.querySelector('.text'))
                document.querySelector('.text').style.marginTop = '1.1rem'
              }
              // 商家地址过长时 增加高度
              if (this.detailObj.businessInfo.length > 18) {
                document.querySelector('.address').style.height = '8.15rem'
                document.querySelector('.text').style.marginTop = '4.6rem'
              }
            }
          })
          .catch(err => {
            console.log(err)
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

  .welfare > span {
    position: absolute;
    height: 19px;
    bottom: 0.75rem;
    color: rgba(130, 130, 130, 1);
  }

  .welfare span span {
    display: inline-block;
    font-size: 14px;
    line-height: 19px;
  }

  .welfare b {
    display: inline-block;
    width: 0.65rem;
    height: 0.75rem;
    background: url('../../assets/img/time.png') no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
  }

  span.right {
    right: 0.75rem;
    font-size: 14px;
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
