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
module.exports={
    getTodolist,
    createTodolist
}