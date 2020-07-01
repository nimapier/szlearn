<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录 
      </span>
      <el-row>
        <el-input 
          v-model="account" 
          placeholder="账号"
          type="text">
        </el-input>
        <el-input 
          v-model="password" 
          placeholder="密码"
          type="password"
          @keyup.enter.native="loginTodo">
        </el-input>
        <el-button type="primary" @click="loginTodo">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    };
  },
  methods: {
      loginTodo(){
          let obj={
            name:this.account,
            password:this.password
          }
          this.API.toLogin(obj)
            .then((res)=>{
              if(res.data.success){
                // window.sessionStorage.setItem('dawa-token',res.data.token)//用sessionStorage把token存下来
                this.$store.commit('SET_TOKEN',res.data.token)
                this.$message({
                  type:'success',
                  message:'登陆成功!'
                })
                this.$router.push('/todolist')
              }else{
                this.$message.error(res.data.info)//登陆失败，显示提示语
                this.$store.commit('SET_TOKEN',res.data.token)//将token清空
              }
            },(err)=>{
              this.$message.error('请求错误')
              this.$store.commit('SET_TOKEN',res.data.token)
            })
      }
  },
};
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px    
</style>