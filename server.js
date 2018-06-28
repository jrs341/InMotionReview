var express = require('express')
var app = express()
 
app.get('/', (req, res) => {
  res.sendFile('views/index.html', {root:__dirname})
})

app.listen(3000, () => console.log('Listening on Port 3000'))