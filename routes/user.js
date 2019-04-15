//导入模块
const express=require('express');
//导入连接池
const pool=require('../pool.js');
//创建路由器
var router=express.Router();
//用户注册
router.post('/reg',(req,res)=>{
  var $uname=req.body.uname;
  var $upwd=req.body.upwd;
  var $email=req.body.email;
  var $phone=req.body.phone;
  var $gender=req.body.gender
  var $age=req.body.age;
  var $birthday=req.body.birthday;
  console.log(req.body);
  pool.query("INSERT INTO boke_user SET ?",[req.body],(err,result)=>{
   if(err) throw err;
    if(result.affectedRows>0){
	 res.send('注册成功')
	}else{
	 res.send('注册失败')
	 }
  })
});
//checkuname接口
	router.get('/checkuname',(req,res)=>{
		var $uname=req.query.uname;
			if($uname.length>0 && $uname.length<6){
				res.send('用户名长度错误，请输入6~12位用户名')
				return;
			}else if($uname.length==0){
				res.send('用户名长度不能为空')
				return;
			}
		var sql='select * from boke_user where uname=?';
		pool.query(sql,[$uname],(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send('用户名已存在')
			}else{
				res.send('用户名可用')
				};
		});
	});
//用户登录接口
	router.post('/login',(req,res)=>{
		var $uname=req.body.uname;
		var $upwd=req.body.upwd;
		if($uname.length>0 && $uname.length<6){
			res.send('用户名长度错误，请输入6~12位用户名')
			return;  
			}else if($uname.length==0){
				res.send('用户名不能为空')
				return;
			}
		if($upwd.length==0){
			res.send('密码不能为空');
			return;
		}
		var sql="select * from boke_user where uname=? and upwd=?"
		pool.query(sql,[$uname,$upwd],(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send('登录成功');
			}else{
				res.send('登录失败');
				}
		})
	})
//用户信息查询接口（根据uid查找）
	router.get('/list',(req,res)=>{
		var $uid=req.query.uid;
		var sql="select * from boke_user where uid=?";
		pool.query(sql,[$uid],(err,result)=>{
			if(err) throw err;
			if(result.length>0){
			res.send(result);
			}else{
			res.send("用户不存在")
			}
		})
	});
//用户信息查询（所有用户）
   router.get ('/lister',(req,res)=>{
		var sql="select * from boke_user";
		pool.query(sql,(err,result)=>{
			if(err) throw err;
			res.send(result);
		})
   })
//用户信息修改
router.post('/update',(req,res)=>{
  var $uid=req.body.uid;
  var $uname=req.body.uname;
  var $upwd=req.body.upwd;
  var $email=req.body.email;
  var $phone=req.body.phone;
  var $gender=req.body.gender
  var $age=req.body.age;
  var $birthday=req.body.birthday;
  var url='UPDATE boke_user SET uname=?,upwd=?,email=?,phone=?,gender=?,age=?,birthday=? WHERE uid=?';
  console.log(url)
  pool.query(url,[$uname,$upwd,$email,$phone,$gender,$age,$birthday,$uid],(err,result)=>{
	if(err) throw err;
	res.send("1");
  })
});

//用户删除
	router.get('/delete',(req,res)=>{
		var $uid=req.query.uid
			console.log($uid)
			if(!$uid){
			res.send("0");
			return;
		}
		var sql="DELETE FROM boke_user WHERE uid=?"
		pool.query(sql,[$uid],(err,result)=>{
			if(err) throw err;
			res.send("1");
		})
	})

//导出路由器
  module.exports=router;
