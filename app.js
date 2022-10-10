const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000

const routes = require('./routes')
require('./config/mongoose')

const app = express()


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extened: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log('this is my web page')
})
