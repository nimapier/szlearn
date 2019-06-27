module.exports={
    lintOnSave:true,
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