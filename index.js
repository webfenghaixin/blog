//导入模块
const express=require('express');

const bodyParser=require('body-parser');
//导入路由器
const userRouter=require('./routes/user.js');
//创建服务器
var server=express();
//监听3000端口
server.listen(3000);
//托管静态文件到public目录下
server.use(express.static('./public'));
server.use(express.static('./images'));
//使用系统自带解析post请求
server.use(bodyParser.urlencoded({
 extended:false
}));
//挂载user路由器
server.use('/user',userRouter);