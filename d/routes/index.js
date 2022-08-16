const path=require('path')

module.exports=(app)=>{
    app.get('/',(req,res)=>{
        res.sendFile(path.resolve('./public/html/index.html'))
    })

    app.use('*',(req,res)=>{
        res.status(404).json({error:'page not found'})
    })
}