const { default: Axios } = require("axios");

export function getTodos(user_id) {
    return Axios.get('/apis/todolist/' + user_id)
}
export function addTodos(obj) {
    return Axios.post('/apis/todolist',obj)
}
export function updateTodos(obj) {
    return Axios.patch('/apis/todolist/' + obj.user_id + '/' + obj.id + '/' + obj.status)
}
export function removeTodos(obj) {
    return Axios.delete('/apis/todolist/' + obj.user_id + '/' + obj.id)
}