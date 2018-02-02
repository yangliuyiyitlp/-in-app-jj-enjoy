window.saveUserId = (userId) => {
  sessionStorage.setItem('userId', userId)
  // 刷新当前页面
  window.location.reload()
}
