<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Dawa></Dawa> -->
    <router-view></router-view> <!-- 原本的Login换成了router-view 这就是路由视图渲染的目标元素-->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Dawa from './components/Dawa.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Dawa
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
