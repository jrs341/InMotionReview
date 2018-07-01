const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./controller/my_movie_controller.js')


app.use(express.static(__dirname))

app.set('view engine', 'ejs')

// Database configuration for mongoose
// db: inmotion
mongoose.connect("mongodb://jrs341:HHCwc3et0@ds123181.mlab.com:23181/inmotion")
// Hook mongoose connection to db
var db = mongoose.connection

// Log any mongoose errors
db.on("error", (error) => {
  console.log("Mongoose Error: ", error)
})

// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", () => {
  console.log("Mongoose connection successful.")
})

app.use('/', routes)
//app.use('/update', routes)
//app.use('/create', routes)

app.listen(3000, () => console.log('Listening on Port 3000'))