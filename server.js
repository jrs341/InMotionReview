const express = require('express')
const app = express()

const routes = require('./controller/my_movie_controller.js')

app.use('/', routes)
//app.use('/update', routes)
//app.use('/create', routes)

app.listen(3000, () => console.log('Listening on Port 3000'))