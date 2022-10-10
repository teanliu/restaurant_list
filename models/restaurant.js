
// mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  // id: {
  //   type: String, 
  //   required: false 
  // },
  name: {
    type: String, 
    required: false 
  },
  name_en: {
    type: String, 
    required: true 
  },
  category: {
    type: String, 
    required: true 
  },
  image: {
    type: String, 
    required: true 
  },
  location: {
    type: String, 
    required: true 
  },
  phone: {
    type: String, 
    required: false 
  },
  google_map: {
    type: String, 
    required: false 
  },
  rating: {
    type: String, 
    required: true 
  },
  description: {
    type: String, 
    required: true 
  },
  done: {
    type: Boolean
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)