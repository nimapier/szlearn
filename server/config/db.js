const Sequelize = require('sequelize')
const Todolist = new Sequelize('mysql://root:nimapier@localhost/oo',{
    define: {
        timestamps:false//取消sequelize自动给数据表加入时间戳（createAt以及updataAt）
    }
})
module.exports = {
    Todolist
}