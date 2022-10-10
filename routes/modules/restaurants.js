const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/search', (req, res) => {
  const sort = req.query.sort
  const keyword = req.query.keyword.toLowerCase().trim()
  if (sort === "A > Z") {
    Restaurant.find()
      .lean()
      .sort({ name_en: 'asc' })
      .then(restaurantData => {
        const restaurants = restaurantData.filter(restaurant => {
          return restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
        })
        res.render('index', { restaurants: restaurants, keyword: req.query.keyword, sort: req.query.sort })
      })
      .catch(error => console.log(error))
  } else if (sort === "Z > A") {
    Restaurant.find()
      .lean()
      .sort({ name_en: 'desc' })
      .then(restaurantData => {
        const restaurants = restaurantData.filter(restaurant => {
          return restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
        })
        res.render('index', { restaurants: restaurants, keyword: req.query.keyword, sort: req.query.sort })
      })
      .catch(error => console.log(error))
  } else if (sort === "Category") {
    Restaurant.find()
      .lean()
      .sort({ category: 'asc' })
      .then(restaurantData => {
        const restaurants = restaurantData.filter(restaurant => {
          return restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
        })
        res.render('index', { restaurants: restaurants, keyword: req.query.keyword, sort: req.query.sort })
      })
      .catch(error => console.log(error))
  } else if (sort === "Location") {
    Restaurant.find()
      .lean()
      .sort({ location: 'asc' })
      .then(restaurantData => {
        const restaurants = restaurantData.filter(restaurant => {
          return restaurant.name_en.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
        })
        res.render('index', { restaurants: restaurants, keyword: req.query.keyword, sort: req.query.sort })
      })
      .catch(error => console.log(error))
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

// new page
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description


  return Restaurant.create({ name_en: `${name_en}`, category: `${category}`, image: `${image}`, location: `${location}`, phone: `${phone}`, google_map: `${google_map}`, rating: `${rating}`, description: `${description}` })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
    .then(restaurants => {
      restaurants.name_en = name_en
      restaurants.category = category
      restaurants.image = image
      restaurants.location = location
      restaurants.phone = phone
      restaurants.google_map = google_map
      restaurants.rating = rating
      restaurants.description = description
      return restaurants.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete 
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router