<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        欢迎：{{name}}！你的待办事项是：
      </span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!Done"> <!--v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for-->
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status == false" :key="index">
                  <span class="item">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="finished(index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template> 
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list" >
              <div class="todo-list" v-if="item.status == true" :key="index">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="restore(index)">还原</el-button>
                </span>
              </div>
            </template> 
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import jwt from 'jsonwebtoken';
export default {
  created() {
    const userInfo=this.getUserInfo()
    // console.log(userInfo);
    if(userInfo!=null){
      this.id=userInfo.id
      this.name=userInfo.name
    }else{
      this.id=''
      this.name=''
    }
    this.getTodolist()
  },
  data () {
    return {
      name: '',
      todos: '',
      activeName: 'first',
      list:[],
      count: 0,
      id:''
    };
  },
  computed: { // 计算属性用于计算是否已经完成了所有任务
    Done(){
      let count = 0;
      let length = this.list.length;
      for(let i in this.list){
        this.list[i].status == true ? count += 1 : '';
      }
      this.count = count;
      if(count == length || length == 0){
        return true
      }else{
        return false
      }
    }
  },

  methods: {
    addTodos() {
      if(this.todos === '')
        return false
      let obj = {
        status: false,
        content: this.todos,
        id:this.id
      }
      this.$http.post('/apis/todolist',obj)
      .then(res => {
        if(res.status==200){
          this.$message({
            type:'success',
            message:'创建成功!'
          })
          this.getTodolist()
        }else{
          this.$message.error('创建失败!')
        }
      },err => {
        this.$message.error('创建失败！')
        console.log(err);
      })
      this.todos=''
    },

    finished(index) {
      // this.$set(this.list[index],'status',true) // 通过set的方法让数组的变动能够让Vue检测到
      this.$http.patch('/apis/todolist/' + this.id + '/' + this.list[index].id + '/' + this.list[index].status).then(res => {
        if(res.status == 200) {
          this.$message({
            type: 'success',
            message: '任务完成！'
          })
          this.getTodolist()
        }else{
          this.$message.err('任务状态更新失败!')
        }
      },err => {
        this.$message.err('任务状态更新失败！')
        console.log(err);
      })
    },
    remove(index) {
      this.$http.delete('/apis/todolist/' + this.id + '/' + this.list[index].id).then(res => {
        if(res.status == 200) {
          this.$message({
            type: 'success',
            message: '任务删除成功!'
          })
          this.getTodolist()
        }else {
          this.$message.err('任务删除失败！')
        }
      },err => {
        this.$message.err('任务删除失败！')
        console.log(err);
      })
    },
    restore(index) {
      this.$http.patch('/apis/todolist/' + this.id + '/' + this.list[index].id + '/' + this.list[index].status).then(res => {
        if(res.status == 200) {
          this.$message({
            type: 'success',
            message: '任务还原完成！'
          })
          this.getTodolist()
        }else{
          this.$message.err('任务状态更新失败!')
        }
      },err => {
        this.$message.err('任务状态更新失败！')
        console.log(err);
      })
    },
    getUserInfo(){
      const token=sessionStorage.getItem('dawa-token')
      if(token!==null&&token!=='null'){
        let decode=jwt.decode(token)
        return decode
      }else{
        return null
      }
    },
    getTodolist(){
      // console.log(this.$http.get('/api/todolist/1'));
      this.$http.get('/apis/todolist/'+this.id)
      .then((result) => {
        if(result.status==200){
          this.list=result.data.result
        }else{
          this.$message.error('获取列表失败')
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
  .el-input
    margin 20px auto
  .todo-list
    width 100%
    margin-top 8px
    padding-bottom 8px
    border-bottom 1px solid #eee
    overflow hidden
    text-align left
    .item
      font-size 20px
      &.finished
        text-decoration line-through
        color #ddd
  .pull-right
    float right
</style>