const express=require('express')
const router=express.Router()

router.get('/static',(req,res)=>{
    res.render('calculator',{
        // 
    })
})

module.exports=router