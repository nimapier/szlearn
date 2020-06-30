const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');
const TARGET_NODE = process.env.plat === "node"
const target = TARGET_NODE ? "server" : "client"
module.exports={
    lintOnSave:true,
    publicPath: '/dist',
    css:{
        sourceMap: true
    },
    configureWebpack: {
        entry: `./src/entry-${target}.js`,
        target: TARGET_NODE ? 'node' : 'web',
        devtool: 'source-map',
        output: {
            libraryTarget: TARGET_NODE ? 'commonjs2' : 'var',
        },
        externals: TARGET_NODE ? nodeExternals({
            whitelist: /\.css$/
        }) : {},
        optimization: {
            splitChunks: {
                chunks: "async",
                minChunks: Infinity
            }
        },
        plugins: [
            TARGET_NODE ? new VueSSRServerPlugin : new VueSSRClientPlugin
        ]
    },
    devServer:{
        proxy:{
            '/apis':{
                target:'http://localhost:3000',
                changeOrigin:true,
                port: 8080,
                ws:true,
                // pathRewrite:{
                //     '^/api':''
                // }
            },
            '/auth':{
                target:'http://localhost:3000',
                changeOrigin:true,
                port: 8080,
                ws:true,
                pathRewrite:{
                    '^/api':''
                },
            },
        }
    }
}