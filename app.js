const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results})
})

app.get('/search', (req, res) => {
  // use trim() to cut off the space
  const keyword = req.query.keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurants => {
    return restaurants.name_en.toLowerCase().includes(keyword) || restaurants.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword })
  // res.send('this is my movie_list web app')
})

app.get('/restaurants/:id', (req, res) => {
  const restaurants = restaurantList.results.filter(restaurant => restaurant.id == req.params.id)
  // console.log(restaurants)
  res.render('show', {restaurants: restaurants[0]})
})

app.listen(port, () => {
  console.log('this is my web page')
})
