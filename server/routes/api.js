const api=require('../controllers/todolist')
const Router=require('koa-router')
const router=Router()
router.get('/todolist/:id',api.getTodolist)
router.post('/todolist',api.createTodolist)
module.exports=router