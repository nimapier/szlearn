const db = require('../config/db')
const userModel = ('../schema/users_sz')//引入表结构
const TodolistDb = db.Todolist//引入数据库
const User = TodolistDb.import(userModel)//用sequelize的import方法引入表结构，实例化了User
const getUserById = async id => {
    const userInfo = await User.findOne({
        where: {
            id:id
        }
    })
    return userInfo
}
const getUserByName=async name => {
    const userInfo = await User.findOne({
        where: {
            user_name:name
        }
    })
    return userInfo
}
module.exports = {
    getUserById,
    getUserByName
}