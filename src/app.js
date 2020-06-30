import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
Vue.prototype.$http=Axios
Vue.use(ElementUI) // Vue全局使用
Vue.config.productionTip = false
import { createRouter } from "./router";
import { createStore } from "./store";
import { sync } from "vuex-router-sync";
export function createApp() {
  const router = createRouter()
  const store = createStore()
  router.beforeEach((to,from,next) => {
    const token=store.getters.token
    if(to.path==='/hellosh') {
      next()
      return
    }
    if(to.path==='/'){
      if(token!=''){
        next('/todolist')
      }
      next()
    }else{
      if(token!==''){
        Vue.prototype.$http.defaults.headers.common['Authorization'] ='Bearer ' + token
        // console.log(Axios.defaults);
        next()
      }else{
        next('/')
      }
    }
  })
  sync(store,router)
  const app = new Vue({
      router,
      store,
      render: h => h(App)
  })
  return {app,router,store}
}
