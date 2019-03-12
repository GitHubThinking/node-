/**
 * 用户数据库
 * */

var mongoose = require('mongoose')

//链接数据库
mongoose.connect('mongodb://localhost:27017/node-blog', {useNewUrlParser: true})

mongoose.set('useFindAndModify', false);
var Schema = mongoose.Schema

var userSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	nickname:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	created_time:{
		type:Date,
		//注意：这里不要写Date.now()因为会即刻调用
		default:Date.now
	},
	last_modified_time:{
		type:Date,
		//注意：这里不要写Date.now()因为会即刻调用
		default:Date.now
	},
	avatar:{
		type:String,
		default:'/public/img/avatar-default.png'
	},
	//个人简介
	bio:{
		type:String,
		default:''
	},
	gender:{
		type:Number,
		enum:[-1,0,1],
		default:0
	},
	birthday:{
		type:String
	},
	status:{
		type:Number,
		//0，没限制
		//1 不可以评论
		//2,不可以登录使用
		enum:[0,1,2],
		default:0
	},
	itentity:{
		type:Number,
		enum:[0,1],
		//0是用户
		//1是管理员
		default:0
	}
})


module.exports = mongoose.model('User',userSchema)
