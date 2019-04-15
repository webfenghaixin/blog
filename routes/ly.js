const express=require("express");
const pool=require('../pools.js');
var router=express.Router();
//创建login端口
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send('用户名不能为空');
		return;
	}else if(!$upwd){
		res.send('用户名密码不正确')
		return;
	}
	var sql="select * from denglu where uname=? and upwd=?"
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send('登录成功');
		}else{
			res.send("登录失败")
			}
	})
})

module.exports=router;
