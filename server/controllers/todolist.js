const todolist=require('../models/todolist')
const getTodolist=async (ctx,next) => {
    const id =ctx.params.id
    const result=await todolist.getTodolistById(id)
    ctx.body={
        success:true,
        result
    }
}
const createTodolist=async (ctx,next) => {
    const data=ctx.request.body
    const success=await todolist.createTodolist(data)
    ctx.body={
        success
    }
}
const deleteTodolist=async (ctx,next) => {
    const id = ctx.params.id
    const user_id = ctx.params.user_id
    const result = await todolist.deleteTodolist(id,user_id)
    ctx.body={
        success:true,
        result
    }
}
const updateTodolist=async (ctx,next) => {
    const id = ctx.params.id
    const user_id = ctx.params.user_id
    const status = ctx.params.status == '0' ? true : false
    const result = await todolist.updateTodolist(id,user_id,status)
    ctx.body= {
        success:true,
        result
    }
}
module.exports={
    getTodolist,
    createTodolist,
    deleteTodolist,
    updateTodolist
}