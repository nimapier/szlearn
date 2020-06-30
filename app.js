/* eslint-disable no-console */
const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const cors = require("koa-cors");
const fs = require("fs");
const app = new Koa();
const router = new Router();
const auth = require("./server/routes/auth");
const api = require("./server/routes/api");
const jwt = require("koa-jwt");
const path = require("path");
// const serve = require("koa-static");
// const histroyApiFallback = require("koa-history-api-fallback");
// const serverBundle = require("./dist/vue-ssr-server-bundle.json");
// const clientManifest = require("./dist/vue-ssr-client-manifest.json");
// const { createBundleRenderer } = require("vue-server-renderer");
// ssr部分

app.use(bodyparser());
app.use(json());
app.use(logger());
// app.use(histroyApiFallback());
// app.use(router())
// app.use(router.routes()).use(router.allowedMethods())
// router.get('/getjson',async ctx => {
//     await cors()
//     ctx.body=JSON.parse(fs.readFileSync('./static/dawa.json'))
// })

app.on("error", (err, ctx) => {
  console.log("server err", err);
});

router.use("/auth", auth.routes()); //挂载到koa-router上，同时会让所有的auth请求路径前面加上'/auth'的请求响应
router.use(
  "/apis",
  jwt({
    secret: "dawayuan",
  }),
  api.routes()
);
app.use(router.routes()); //将路由规则挂载到koa上
// app.use(serve(path.resolve('dist')))

app.listen(3000);
