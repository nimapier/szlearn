/* eslint-disable no-console */
const user = require('../models/user')
const jwt = require('jsonwebtoken')
// cosnt bcrypt = require('bcryptjs')
const getUserInfo = async (ctx,next) => {
    const id = ctx.params.id//获取url里传过来的参数里的id
    const result = await user.getUserById(id)//通过async，awiat“同步”地返回查询结果
    ctx.body=result//将请求的结果放到response的body里返回
}
const postUserAuth = async (ctx,next) => {
    const data =ctx.request.body
    const userInfo=await user.getUserByName(data.name)
    if(userInfo!=null){
        if(userInfo.password!=data.password){
            ctx.body={
                success:false,
                info:'密码错误'
            }
        }else{
            const userToken = {
                name:userInfo.user_name,
                id:userInfo.id
            }
            const secret='dawayuan'//秘钥
            const token=jwt.sign(userToken,secret)
            ctx.body={
                success:true,
                token:token
            }
        }
    }else{
        this.body={
            success:false,
            info:'用户不存在!'
        }
    }
}
module.exports = {
    getUserInfo,
    postUserAuth
}