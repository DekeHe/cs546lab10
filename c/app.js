const express=require('express')
const app=express()
const static=express.static(__dirname+'/public')
const session=require('express-session')
const routes=require('./routes')
const exphbs=require('express-handlebars')

// async function f()
// {
// 	const connection=require('./config/mongoConnection')
// 	const _db=await connection.dbConnection()
// 	await _db.dropDatabase()
// } 
// f()

// const handlebarsInstance=exphbs.create({
// 	defaultLayout:'main',
// 	helpers:{
// 		asJSON:function(obj,spacing){
// 			if(typeof spacing==='number')
// 			return new Handlebars.SafeString
// 			(JSON.stringify(obj,null,spacing))
// 			return new Handlebars.SafeString(JSON.stringify(obj))
// 		}
// 	}
// })

// const rewriteUnsupportedBrowserMethods=function(req,res,next){
// 	if(req.body && req.body._method) {
// 		req.method=req.body._method
// 		delete req.body._method
// 	}
// 	next()
// }

app.use
app.use('/public',static)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(rewriteUnsupportedBrowserMethods)

app.engine('handlebars',exphbs.engine({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(session({
    name:'AuthCookie',
    secret:"some secret string!",
    resave:false,
    saveUninitialized:true,
}))

// app.use('/private',function(req,res,next){
// 	if(!req.session.user) 
// 	{
// 		return res.render('users/login')
// 	}
// 	else
// 	{
// 		next()
// 	}
// })

// app.use('/login',function(req,res,next){
// 	if(req.session.user) 
// 	{
// 		return res.redirect('/private')
// 	} 
// 	else 
// 	{
// 		req.method='POST'
// 		next()
// 	}
// })

app.use(async(req,res,next)=>{
	let r=''
	const currentTimestamp=new Date().toUTCString()
	const  requestMethod=req.method
	const requestRoute=req.originalUrl
	r=currentTimestamp+'\t' +requestMethod+'\t'+requestRoute+'\t'
	if(req.session.user)
	{
		r=r+'is authenticated'
	}
	else
	{
		r=r+'is not authenticated'
	}
	console.log(r)
	next()
})

routes(app)

app.listen(3000,function(){
	console.log("We've now got a server!")
	console.log('Your routes will be running on http://localhost:3000')
})