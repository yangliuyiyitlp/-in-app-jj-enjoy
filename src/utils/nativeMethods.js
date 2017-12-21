let u = navigator.userAgent

let nativeMethods = {
  // 获取地址栏参数
  getQS: (paras) => {
    // console.log('getQueryString')
    let url = location.href
    // let url = 'http://99company.99bicycle.com:9002/ElectricBicycleActivity/dist/index.html#/enjoylist?userId=0&isApp=1&cityName=上海市'
    let paraArr = url.substring(url.indexOf('?') + 1, url.length).split('&')
    let paraObj = {}
    for (let i = 0; i < paraArr.length; i++) {
      paraObj[paraArr[i].split('=')[0].toLowerCase()] = paraArr[i].split('=')[1]
    }
    let returnValue = paraObj[paras.toLowerCase()]
    if (typeof (returnValue) === 'undefined') {
      return ''
    } else {
      return decodeURIComponent(returnValue)
    }
  },
  // 分享可以分享的所有接口
  toShare: (arr) => {
    // console.log(u)
    // console.log('toShare')
    // 格式要求 arr = ['shareType', 'url', 'title', 'content', 'shareImageUrl']
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
      // window.sharePlatform.goSharePlatform(arr)
      window.sharePlatform.setJJShareInitWithInfo(arr)
    } else {
      // window.webkit.messageHandlers.shareActivityPlatform.postMessage(arr)
      window.webkit.messageHandlers.JJShareInitWithInfo.postMessage(arr)
    }
  },
  // 去首页
  toHome: function () {
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
      window.sharePlatform.goHome()
    } else {
      window.webkit.messageHandlers.goToHomeEvent.postMessage(null)
    }
  },
  // 未登录跳转登录
  toLogin: function () {
    // console.log(u)
    // console.log('toLogin')
    // console.log(this.getQS('userId'))
    if (sessionStorage.getItem('userId') === '0' || sessionStorage.getItem('userId') === 0) {
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        window.sharePlatform.goToLogin()
      } else {
        window.webkit.messageHandlers.goToLogin.postMessage(null)
      }
    }
  },
  // 扫码 自行车ok
  toScan: () => {
    // console.log('toScan')
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
      window.sharePlatform.goScan()
    } else {
      window.webkit.messageHandlers.goToScanEvent.postMessage(null)
    }
  },
  // todo 这是做的指定分享 ok
  goToScanSpecialEvent: () => {
    // console.log('goToScanSpecialEvent')
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
      window.sharePlatform.goSharePlatform('3', 'http://99company.99bicycle.com:9002/ElectricBicycleActivity/Pull-the-new/share.html', '2c94bf815aa65346015aa66428cb0160', '测试分享', '只是想测测分享成不成功', 'http://jjdc-client.oss-cn-shanghai.aliyuncs.com/appIcon/test_jiangshi.png')
    } else {
      window.webkit.messageHandlers.shareActivityPlatform.postMessage(['1', 'http://99company.99bicycle.com:9002/ElectricBicycleActivity/Pull-the-new/share.html', '2c94bf815aa65346015aa66428cb0160', '测试分享', '只是想测测分享成不成功', 'http://jjdc-client.oss-cn-shanghai.aliyuncs.com/appIcon/test_jiangshi.png'])
    }
  },
  // 防止页面滚动
  pageNoScroll: () => {
    document.querySelector('body').css({'height': window.innerHeight, 'overflow': 'hidden'})
  },
  // 解除防止页面滚动
  pageScroll: () => {
    document.querySelector('body').css({'height': 'auto', 'overflow': 'auto'})
  }
}

export default nativeMethods
