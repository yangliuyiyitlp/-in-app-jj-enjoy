<template>
  <div id="welfareList">
    <ul>
      <li v-for="item in list" :key="item.id" @click="goWelfareDetail(item.id)">
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
        list: []
      }
    },
    created () {
      this.getList()
    },
    // 导航离开该组件时把位置存起来
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      let getScrollTop = () => {
        let scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        return scrollTop
      }
      let scrollTop = getScrollTop()
      sessionStorage.setItem('WelfareListScrollTop', scrollTop) // 离开福利列表路由时把位置存起来
//      console.log(scrollTop)
      next()
    },
    // 返回该页面时取出scrollTop
    updated () {
      let _this = this
      // 返回同一个位置
      let scrollTop = +sessionStorage.getItem('WelfareListScrollTop') // 返回福利列表页面取出来
      if (scrollTop) {
        _this.$nextTick(function () {
          window.scroll(0, scrollTop)
        })
      }
    },
    methods: {
      // 获取赳赳福利列表
      getList () {
//        /wc/list/{cityName}
        let getListUrl = `/wc/list/${sessionStorage.getItem('cityName')}`
//        getListUrl = '/wc/list/sh'
        this.$ajax.get(getListUrl)
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data.data)
              this.list = res.data.data
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 去商家福利详情页面
      goWelfareDetail (id) {
//        console.log(id)
        this.$router.push({name: 'welfare.detail', params: {id: id}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #welfareList {
    background-color: #fff;
    padding-top: 1rem;
  }

  ul {
    overflow: hidden;
  }

  li {
    float: left;
    width: 8.25rem;
    height: 11rem;
    margin-bottom: 0.75rem;
    margin-left: 0.75rem;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
    overflow: hidden;
    -webkit-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.1);
  }

  li img {
    width: 8.25rem;
    height: 8.25rem;
  }

  span {
    display: block;
    margin-left: 0.5rem;
    text-align: left;
  }

  .shopTitle {
    margin-top: 0.35rem;
    font-size: 0.7rem;
    color: #4D4E4F;
  }

  .shopLimit {
    margin-top: 0.1rem;
    font-size: 0.6rem;
    color: #bbb;
  }

</style>
