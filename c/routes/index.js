const usersRoutes=require('./users')

module.exports=(app)=>{
    app.use('',usersRoutes)
    app.use('*',(req,res)=>{
        res.sendStatus(404)
    })
}