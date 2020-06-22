const api=require('../controllers/todolist')
const Router=require('koa-router')
const router=Router()
router.get('/todolist/:id',api.getTodolist)
router.post('/todolist',api.createTodolist)
router.delete('/todolist/:user_id/:id',api.deleteTodolist)
router.patch('/todolist/:user_id/:id/:status',api.updateTodolist)
module.exports=router