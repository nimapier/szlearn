import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import Router from 'vue-router'
import Axios from 'axios'

Vue.prototype.$http=Axios
Vue.use(ElementUI) // Vue全局使用
Vue.use(Router)
Vue.config.productionTip = false
import Dawa from './components/Dawa'
import TodoList from './components/TodoList'
import HelloWorld from './components/HelloWorld';
const router =  new Router({
  mode: 'history', // 开启HTML5的history模式，可以让地址栏的url长得跟正常页面跳转的url一样。（不过还需要后端配合，讲Koa的时候会说）
  base: __dirname, 
  routes: [
    {
      path: '/',  // 默认首页打开是登录页
      component: Dawa
    },
    {
      path: '/todolist',
      component: TodoList
    },
    {
      path: '*',
      redirect: '/' // 输入其他不存在的地址自动跳回首页
    },{
      path:'/hellosh',
      component: HelloWorld
    }
  ]
})
router.beforeEach((to,from,next) => {
  const token=sessionStorage.getItem('dawa-token')
  if(to.path==='/hellosh') {
    next()
    return
  }
  if(to.path==='/'){
    if(token!='null'&&token!==null){
      next('/todolist')
    }
    next()
  }else{
    if(token!=='null'&&token!==null){
      Vue.prototype.$http.defaults.headers.common['Authorization'] ='Bearer ' + token
      // console.log(Axios.defaults);
      next()
    }else{
      next('/')
    }
  }
})
new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
