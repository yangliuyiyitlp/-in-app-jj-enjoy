window.saveUserId = (userId) => {
  // alert('执行成功=' + userId)
  sessionStorage.setItem('userId', userId)
  window.location.reload()
}
