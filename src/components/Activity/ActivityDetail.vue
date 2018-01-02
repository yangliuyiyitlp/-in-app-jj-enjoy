<template>
  <div class="list">
    <!--<p>adId-&#45;&#45;{{adId}}</p>-->
    <!--<p>userId-&#45;&#45;{{userId}}</p>-->
    <!--<p>isApp-&#45;&#45;{{isApp}}</p>-->
    <div id="apptest" @click="toShare">shareActivityPlatform</div>
  </div>
</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        adId: '',
        userId: '',
        isApp: ''
      }
    },
    created () {
      this.userId = sessionStorage.getItem('userId')
      this.isApp = nativeMethods.getQS('isApp')
      this.adId = nativeMethods.getQS('adId')
//      console.log('adId:' + this.adId)
      this.getDetail()
      this.toShare()
    },
    methods: {
      getDetail () {
//        /ac/detail/{adId}/{isApp}
        let getDetailUrl = `/ac/detail/${this.adId}/${sessionStorage.getItem('isApp')}`
        getDetailUrl = '/ac/detail/2c94bf815aa65346015aa66428cb0161/1'
        this.$ajax.get(getDetailUrl)
          .then(res => {
            if (res.data.code === 200) {
              let obj = res.data.data
              console.log(obj)
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
  li img {
    width: 100%;
  }

  #apptest {
    width: 300px;
    height: 100px;
    background: red;
  }

  #apptest1 {
    width: 300px;
    height: 100px;
    background: green;
  }

  #apptest2 {
    width: 300px;
    height: 100px;
    background: blueviolet;
  }

  #apptest3 {
    width: 300px;
    height: 100px;
    background: yellow;
  }

  #apptest4 {
    width: 300px;
    height: 100px;
    background: pink;
  }

</style>
