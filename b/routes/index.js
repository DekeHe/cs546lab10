const calculatorRoutes=require('./calculator')

module.exports=(app)=>{
    app.use('/calculator',calculatorRoutes)
    app.use('*',(req,res)=>{
        res.redirect('/calculator/static')
    })
}
