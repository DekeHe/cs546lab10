const express=require('express')
const app=express()

const routes=require('./routes')
const exphbs=require('express-handlebars')

app.use('/public', express.static(__dirname+'/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

routes(app)

app.listen(3000, () => {
  console.log("We've now got a server!")
  console.log('Your routes will be running on http://localhost:3000')
})