const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.static(__dirname))

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


app.get('/', (req, res) => {
  res.sendFile('dist/public/index.html', { root: __dirname })
})

app.get('/movies', (req, res) => {
  Movies.find({}, (error, doc) => {
    if (error) {
      res.send(error)
    } else {
      res.send(doc)
    }
  })
})

app.listen(3000, () => console.log('Listening on Port 3000'))