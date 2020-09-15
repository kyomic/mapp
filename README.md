# ReactApp　网站


项目是通过Facebook的 [Create React App](https://github.com/facebook/create-react-app)启动

仅供前端攻城狮们学习和参考，完成度10%，目前仅支持不同频道数据展示



## 说明

### 技术知识
TypeScript & React & Redux 相关


### 安装及运行


默认的调试端口：3000
目前项目在node12.18 win64环境正常运行

```
开启CMD
npm install
npm run start

#启动proxy服务解决数据跨域问题
开启CMD
node src/server.js


```


[调试页面](http://localhost:3000)

###　结构图



![Image text](https://raw.githubusercontent.com/kyomic/mapp/master/doc.png)



###　因时间关系而遗留问题

1. setupProxy.js  proxyMiddlewire 不能运行，只能通过server.js创建代理服务
2. ES6解构不好使，只能通过 Object.assign代替



最重要的是，感谢大家点赞支持，求star,求关注,不忘互联网的初衷“知识共享”