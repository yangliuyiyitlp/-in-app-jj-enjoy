let baseUrl

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://active.99bicycle.com/jjlx' // 正式地址
  // baseUrl = 'http://139.224.218.44/jjlx' // uta同一个地址
  baseUrl = 'http://139.196.194.172:8080/jjlx/'  // 测试地址
} else if (process.env.NODE_ENV === 'test') {
  // welfareUrl = 'http://139.196.194.172:8080/jjlx/' // 测试地址
} else {
  // baseUrl = 'http://192.168.0.164:8281' // dev地址
  // baseUrl = 'http://139.196.194.172:8080/jjlx/'  // 测试地址
}

module.exports = baseUrl
