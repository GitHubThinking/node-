var express = require('express')	
var path = require('path')
var router = require('./router')
var bodyParser = require('body-parser')
var app = express()	
var session = require('express-session')
//
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
app.use('/upload/',express.static(path.join(__dirname,'./upload/')))


app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/')) //默认是./views目录



app.use(bodyParser.urlencoded({
	extended: false
}))

// parse application/json
app.use(bodyParser.json())


//session操作
app.use(session({
	//配置加密字符串，它会在原有加密的基础上和这个字符串拼起来去加密
	//目的是为了增加安全性，防止客户端恶意伪造
  secret: 'hxhnb',
  resave: false,
  saveUninitialized: true  //无论你用不用session，都会给你分配一把钥匙
}))

//app.use('/index', (req, res, next) => {
//// 1. 如果是登录页面 /admin/login，允许通过
////if (req.originalUrl === '/login') {
////  // 这里 next() 就会往后匹配调用到我们的那个能处理 /admin/login 的路由
////  return next()
////}
////
////// 2. 其他页面都一律验证登录状态
////const sessionUser = req.session.user
//////    如果没有登录页， 让其重定向到登录页
////if (!sessionUser) {
////  return res.redirect('/login')
////}
//
//// 如果登录了，则允许通过
//// 这里调用 next 就是调用与当前请求匹配的下一个中间件路由函数
//// 例如，当前请求是 /admin/users ，则 next 会找到我们那个匹配 /admin/users 的路由去处理
////                  /admin/categories ，则 next 会找到我们添加的那个 /admin/categories 的路由去处理
//next()
//})


//把路由挂在到页面中
app.use(router)

// 配置一个处理 404 的中间件
app.use(function (req, res) {
  res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})


app.listen(5000,function(){
	console.log('running...')
})



















