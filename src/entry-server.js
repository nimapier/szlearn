import { createApp } from "./app"
export default context => {
    // 考虑到异步路由钩子函数或组件，返回一个promise
    return new Promise((resolve, reject) => {
        const{app,router} = createApp()
        // 设置服务器端router的位置
        router.push(context.url)
        // 等到router将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if(!matchedComponents.length) {
                return reject({code:404})
            }
            resolve(app)
        },reject)
    });
}