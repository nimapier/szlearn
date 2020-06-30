import { createApp } from "./app"
export default context => {
    // 考虑到异步路由钩子函数或组件，返回一个promise
    return new Promise((resolve, reject) => {
        const{app,router,store} = createApp()
        // 设置服务器端router的位置
        router.push(context.url)
        // 等到router将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            // const matchedComponents = router.getMatchedComponents()
            // if(!matchedComponents.length) {
            //     return reject({code:404})
            // }
            // 使用vue2.6新增的rendered回调来渲染context，这里中英文的文档不太一样，中文文档和官方demo均没有同步更新
            context.rendered = () => {
                context.state = store.state
            }
            resolve(app)
        },reject)
    });
}