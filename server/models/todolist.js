const db=require('../config/db')
const todoModel=('../schema/list')
const TodolistDB=db.Todolist
const Todolist=TodolistDB.import(todoModel)
const getTodolistById=async id => {
    const todolist=await Todolist.findAll({
        where:{
            user_id:id
        },
        attributes:['id','content','status']
    })
    return todolist
}
const createTodolist=async data => {
    await Todolist.create({
        user_id:data.id,
        content:data.content,
        status:data.status
    })
    return true
}
const deleteTodolist=async (id,user_id) => {
    await Todolist.destroy({
        where: {
            id: id,
            user_id: user_id
        }
    })
    return true
}
const updateTodolist=async (id,user_id,status) =>{
    await Todolist.update({
        status: status
    },{
        where: {
            id: id,
            user_id: user_id
        }
    })
}
module.exports={
    getTodolistById,
    createTodolist,
    deleteTodolist,
    updateTodolist
}