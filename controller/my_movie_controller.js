const express = require('express')
const router = express.Router()
const http = require('http')
const fs = require('fs')
//const movies = require('../models/movies')
const ids = [{title: 'Zoolander', id: 'tt0196229'},
{title: 'Guardians of the Galaxy', id: 'tt3896198'},
{title: 'Rambo', id: 'tt0462499'}]

sortByTitle = (a,b) => {
	if (a.title > b.title)
		return -1
	if (a.title < b.title)
		return 1
	return 0
}

const sortedIds = ids.sort(sortByTitle)
let initialData = []

for (var i = 0; i<sortedIds.length; i++ ){
	http.get('http://www.omdbapi.com/?apikey=7b20f955&i=' + sortedIds[i].id, (res) => {
	//http.get('http://www.omdbapi.com/?apikey=7b20f955&i=tt3896198', (res) => {
	  const { statusCode } = res
	  const contentType = res.headers['content-type']

	  let error
	  if (statusCode !== 200) {
	    error = new Error('Request Failed.\n' +
	        `Status Code: ${statusCode}`)
	  } else if (!/^application\/json/.test(contentType)) {
	    error = new Error('Invalid content-type.\n' +
	        `Expected application/json but received ${contentType}`)
	  }
	  if (error) {
	    console.error(error.message)
	    // consume response data to free up memory
	    res.resume()
	    return;
	  }

	  res.setEncoding('utf8')
	  let rawData = ''
	  res.on('data', (chunk) => { rawData += chunk; })
	  res.on('end', () => {
	    try {
	      const parsedData = JSON.parse(rawData)
	      console.log(parsedData)
	      const movieData = new Object()
	      	movieData.title = parsedData.Title
	      	movieData.genre = parsedData.Genre
	      	movieData.actors = parsedData.Actors
	      	movieData.ratings = parsedData.Ratings
	      	movieData.year = parsedData.Year
	      	movieData.id = parsedData.imdbID
	      initialData.push(movieData)
	    } catch (e) {
	      console.error(e.message)
	    }
	  })
	}).on('error', (e) => {
	  console.error(`Got error: ${e.message}`)
	})
}

router.get('/', (req, res) => {
	console.log('****** initialData *******', initialData[1].ratings)
	res.render('index', {data: initialData})
})

module.exports = router