const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const cors = require("koa-cors");
const fs = require("fs");
const app = new Koa();
const serve = require("koa-static");
const path = require("path");
const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");
const { createBundleRenderer } = require("vue-server-renderer");
app.use(serve(path.resolve("dist")));
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: require("fs").readFileSync(
    path.resolve(__dirname, "./index.template.html"),
    "utf-8"
  ),
  clientManifest,
});
const renderData = (ctx, renderer) => {
  const context = {
    url: ctx.url,
    title: "Vue Koa2 SSR",
    // cookies: ctx.request.headers.cookie,
  };
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        return reject(err);
      }
      resolve(html);
    });
  });
};
app.use(async (ctx, next) => {
  if (!renderer) {
    (ctx.type = "html"),
      (ctx.body = "waiting for compilation... refresh in a moment.");
    return;
  }
  let html, status;
  try {
    status = 200;
    html = await renderData(ctx, renderer);
  } catch (e) {
    console.log("\ne", e);
    if (e.code === 404) {
      status = 404;
      html = "404 | Not Found";
    } else {
      status = 500;
      html = "500 | Internal Server Error";
    }
  }
  ctx.type = "html";
  ctx.status = status ? status : ctx.status;
  ctx.body = html;
});
app.on('error', (err) => {
    console.error('Server error: \n%s\n%s ', err.stack || '')
  })
app.listen(4000);
