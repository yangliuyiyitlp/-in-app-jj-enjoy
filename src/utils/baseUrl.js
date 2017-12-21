let baseUrl

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://139.196.194.172:8281'
  // baseUrl = 'http://139.196.194.172:8081'
} else if (process.env.NODE_ENV === 'test') {
  // baseUrl = 'http://192.168.0.164:8281'
  baseUrl = 'http://139.196.194.172:8081'
} else {
  // baseUrl = 'http://192.168.0.164:8281'
  baseUrl = 'http://139.196.194.172:8281'
}

module.exports = baseUrl
