const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express();
app.use('/po/**', 
    createProxyMiddleware({
        target: 'http://po.funshion.com',  
        changeOrigin: true, 
        pathRewrite: {'^/po': ''} ,
        router: {
            'http://127.0.0.1:3001': 'http://po.funshion.com',
        }
    })
);
app.listen(3001);
