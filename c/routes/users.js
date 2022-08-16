// const users=require('./u')

const express=require('express')

const data=require('../data')
const users=data.users

const router=express.Router()

router.get('/',(req,res)=>{
    if(req.session.user)
    {
        res.redirect('/private')
    }
    else
    {
        res.render('users/login')
    }
})

router.get('/signup',(req,res)=>{
    if(req.session.user)
    {
        res.redirect('/private')
    }
    else
    {
        res.render('users/signup')
    }
})

router.post('/signup',async(req,res)=>{
    const username=req.body.username
    const password=req.body.password

    let inserted=undefined
    try
    {
        inserted=await users.addUser(username,password)
        if(inserted.userInserted===true)
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

router.post('/login',async(req,res)=>{
    let username=req.body.username
    let password=req.body.password

    let AuthCookie=undefined
    try
    {
        AuthCookie=await users.checkIfAccessed(username,password)
        if(AuthCookie.authenticated===true)
        {
            req.session.user=
            {
                username:username,
                password:password
            }
            res.redirect('/private')
        }
        else
        {
            // 
        }
    }
    catch(e)
    {
        res.status(400).render('users/login',{
            hasError:true,
            error:e
        })
    }
})

router.get('/private',(req,res)=>{ 
    if(req.session.user)
    {
        res.status(400).render('users/private',{
            user:req.session.user
        })
    }
    else
    {
        res.render('users/login')
    }
})

router.get('/logout',(req,res)=>{ 
    res.clearCookie('AuthCookie')
    res.render('users/logout')
})

module.exports=router
