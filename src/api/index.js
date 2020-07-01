const { default: Axios } = require("axios");
import Vue from 'vue';
const REST_URL = process.env.NODE_ENV == 'production' ? 'http://localhost:5000' : ''//nginx端口
const TodoUrl = REST_URL + '/apis/todolist/'
const ToLoginUrl = REST_URL + '/auth/user'
export function getTodos(user_id) {
    return Axios.get(TodoUrl + user_id)
}
export function addTodos(obj) {
    return Axios.post(TodoUrl,obj)
}
export function updateTodos(obj) {
    return Axios.patch(TodoUrl + obj.user_id + '/' + obj.id + '/' + obj.status)
}
export function removeTodos(obj) {
    return Axios.delete(TodoUrl + obj.user_id + '/' + obj.id)
}
export function toLogin(obj) {
    return Axios.post(ToLoginUrl,obj)
}
Vue.prototype.API = {
    addTodos,
    getTodos,
    updateTodos,
    removeTodos,
    toLogin
}