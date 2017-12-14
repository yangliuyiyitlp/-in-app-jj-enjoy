<template>
  <div class="list">
    <div id="apptest" @click="toShare">shareActivityPlatform</div>
    <div id="apptest1" @click="toLogin">goToHomeEvent</div>
    <div id="apptest2" @click="toScan">goToScanEvent</div>
    <div id="apptest3" @click="goToScanSpecialEvent">goToScanSpecialEvent</div>

    <ul>
      <li>
        <a href="#">
          <img src="../../assets/img/blublu.png" alt="">
        </a>
      </li>
      <li>
        <a href="#">
          <img src="../../assets/img/gx.png" alt="">
        </a>
      </li>
      <li>
        <a href="#">
          <img src="../../assets/img/huode.png" alt="">
        </a>
      </li>
      <li>
        <a href="#">
          <img src="../../assets/img/weihuode.png" alt="">
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
  import nativeMethods from '@/utils/nativeMethods.js'

  export default {
    data () {
      return {
        list: []
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
      },
      toLogin () {
        nativeMethods.toLogin()
      },
      toShare () {
        nativeMethods.toShare()
      },
      toScan () {
        nativeMethods.toScan()
      },
      goToScanSpecialEvent () {
        nativeMethods.goToScanSpecialEvent()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
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

</style>
