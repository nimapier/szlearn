import Vue from "vue";
import Router from "vue-router";
// import Dawa from '../components/Dawa'
// import TodoList from '../components/TodoList'
// import HelloWorld from '../components/HelloWorld';
Vue.use(Router);
export function createRouter() {
  const router = new Router({
    mode: "history",
    base: __dirname,
    routes: [
      {
        path: "/", // 默认首页打开是登录页
        // component: Dawa,
        component: () => import('../components/Dawa')
      },
      {
        path: "/todolist",
        // component: TodoList,
        component: () => import('../components/TodoList')
      },
      {
        path: "*",
        redirect: "/", // 输入其他不存在的地址自动跳回首页
      },
      {
        path: "/hellosh",
        // component: HelloWorld,
        component: () => import('../components/HelloWorld')
      },
    ],
  });
  return router
}
