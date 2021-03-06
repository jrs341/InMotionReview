const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Movies = require('./models/movies')
app.use(express.static(__dirname))

app.use(bodyParser.urlencoded({
  extended: false
}))

// Database configuration for mongoose
// db: inmotion
mongoose.connect('mongodb://jrs341:HHCwc3et0@ds123181.mlab.com:23181/inmotion')
// Hook mongoose connection to db
var db = mongoose.connection

// Log any mongoose errors
db.on('error', (error) => {
  console.log('Mongoose Error: ', error)
})

// Log a success message when we connect to our mongoDB collection with no issues
db.once('open', () => {
  console.log('Mongoose connection successful.')
})

app.get(`/`, (req, res) => {
  res.sendFile('dist/public/index.html', { root: __dirname })
})

app.get('/search/:text', (req, res) => {
  Movies.find({$text: { $search: req.params.text}}, (error, doc) => {
    if (error) {
      res.send(error)
    } else {
      res.send(doc)
    }
  })
})

app.post('/newMovie', (req, res) => {
  var newMovie = new Movies(req.body)
  newMovie.save((error, doc) => {
    if (error) {
      res.send(error)
    } else {
      res.send(doc)
    }
  })
})

app.post('/editMovie', (req, res) => {
  const newBody = {}
  Object.keys(req.body).forEach(key => {
      if (key == 'ratings') {
        // newBody.ratings = { $push: { ratings: { Source: 'myRating', Value: req.body[key] } } }
        newBody.ratings = []
      } else {
        if (key = 'id') {

        } else {
          newBody[key] = req.body[key]
        }
      }
    })

  Movies.update({_id: req.body.id}, { $set: newBody }, (error, doc) => {
    if (error) {
      res.send(error)
    } else {
      res.send(doc)
    }
  })
})

app.post('/deleteMovie', (req, res) => {
  Movies.remove({_id: req.body.id}, (error, doc) => {
    if (error) {
      res.send(error)
    } else {
      res.send(doc)
    }
  })
})

app.listen(3000, () => console.log('Listening on Port 3000'))