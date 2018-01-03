let baseUrl

if (process.env.NODE_ENV === 'production') {
  // baseUrl = 'https://active.99bicycle.com/jjlx'
  baseUrl = 'http://139.196.194.172:8080/jjlx/'
  // baseUrl = 'http://192.168.0.164:8281'
} else if (process.env.NODE_ENV === 'test') {
  // baseUrl = 'http://192.168.0.164:8281'
  baseUrl = 'http://139.196.194.172:8281'
} else {
  // baseUrl = 'http://192.168.0.164:8281'
  baseUrl = 'http://139.196.194.172:8080/jjlx/'
}

module.exports = baseUrl
