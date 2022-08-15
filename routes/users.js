const express=require('express')
const router=express.Router()
const data=require('../data')
const users=data.users

// const validation=require('../validation')

router.get('/',function(req,res){
	if(req.session.user)
	{
		res.redirect('/private')
	}
	else
	{
		res.render('users/login')
	}
})

router.get('/signup',async function(req,res){
	if(req.session.user)
	{
		res.redirect('/private')
	}
	else
	{
		res.render('users/signup')
	}
})

router.post('/signup',async function(req,res){
	let username=req.body.username
	let password=req.body.password

	username=username.toLowerCase()
	

	let userInsertedInfo=undefined
	try
	{
		// const authenticatedInfo=await users.checkUser(username,password)
		// username=validation.checkUsername(username,'username')
		// password=validation.checkPassword(password,' password')

		userInsertedInfo=await users.createUser(username,password)
		if(userInsertedInfo.userInserted===true)
		{
			res.redirect('/')
		}
		else
		{
			res.status(500).json('Internal Server Error')
			return
		}
	}
	catch(e)
	{
		res.status(400).render('users/signup',{
			hasError:true,
			error:e
		})
	}
})

router.post('/login',async function(req,res){
	let username=req.body.username
	let password=req.body.password

	username=username.toLowerCase()

	let AuthCookie=undefined
	try
	{
		AuthCookie=await users.checkUser(username,password)
		if(AuthCookie.authenticated===true)
		{ 
			req.session.user={username:username}
			res.redirect('/private')
		}
		else
		{
			// res.status(400)
			// .json('did not provide a valid username and/or password')
		}
	}
	catch(e)
	{
		res .status(400).render('users/login',{ 
			hasError:true,
			error:e
		})
	}

	
})

router.get('/private',async function(req,res){
	if(req.session.user)
	{
		res.render('users/private', {user:req.session.user})
	}
	else
	{
		res.render('users/login')
	} 
})

router.get('/logout',async function(req,res){
	res.clearCookie('AuthCookie')
	res.render('users/logout')
})

module.exports=router

