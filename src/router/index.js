import Vue from 'vue'
import Router from 'vue-router'
import EnjoyList from '@/components/List/enjoyList'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: {name: 'enjoylist'}},
    {
      path: '/enjoylist',
      name: 'enjoylist',
      component: EnjoyList,
      beforeRouteLeave (to, from, next) {
        let position = window.scrollY()
        this.$store.commit('SAVE_POSITION', position) // 离开路由时把位置存起来
        console.log(1, this.$store.state.position)
        // next()
      }
    }
  ]
})
