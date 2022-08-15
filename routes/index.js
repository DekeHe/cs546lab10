const userRoutes=require('./users')

const constructorMethod=function(app) {
	app.use('/',userRoutes)

	app.use('*',function (req,res) {
		res.sendStatus(404)
	})
}

module.exports=constructorMethod
