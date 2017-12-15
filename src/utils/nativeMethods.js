let u = navigator.userAgent

let nativeMethods = {
  // 获取地址栏参数
  getQS: (paras) => {
    console.log('getQueryString')
    let url = location.href
    // let url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&userId=tom'
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
  // todo 这是怎么分享的?
  toShare: () => {
    console.log(u)
    console.log('toShare')
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
      window.sharePlatform.goSharePlatform('1')
    } else {
      window.webkit.messageHandlers.shareActivityPlatform.postMessage('1')
    }
  },
  // 未登录跳转登录
  toLogin: function () {
    console.log(u)
    console.log('toLogin')
    console.log(this.getQS('userId'))
    if (this.getQS('userId') === '0' || this.getQS('userId') === 0) {
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        window.sharePlatform.goToLogin()
      } else {
        window.webkit.messageHandlers.goToLogin.postMessage(null)
      }
    }
  },
  // 扫码 自行车
  toScan: () => {
    console.log('toScan')
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
      window.sharePlatform.goScan()
    } else {
      window.webkit.messageHandlers.goToScanEvent.postMessage(null)
    }
  },
  // todo 这是怎么分享的?
  goToScanSpecialEvent: () => {
    console.log('goToScanSpecialEvent')
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
