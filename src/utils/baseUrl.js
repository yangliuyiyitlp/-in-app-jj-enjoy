let baseUrl

// if (process.env === 'PRODUCTION') {
if (process.env === 'production') {
  baseUrl = 'http://192.168.0.164:8080'
// } else if (process.env === 'TEST') {
} else if (process.env === 'test') {
  baseUrl = 'http://192.168.0.164:8080'
} else {
  baseUrl = 'http://192.168.0.164:8080'
}

module.exports = baseUrl
