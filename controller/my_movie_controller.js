const express = require('express')
const router = express.Router()
const http = require('http')
const fs = require('fs')
//const movies = require('../models/movies')
const ids = [{title: 'Zoolander', id: 'tt0196229'},
{title: 'Guardians of the Galaxy', id: 'tt3896198'},
{title: 'Rambo', id: 'tt0462499'}]

sortByTitle = (a,b) => {
	if (a.title < b.title)
		return -1
	if (a.title > b.title)
		return 1
	return 0
}

const sortedIds = ids.sort(sortByTitle)
let initialData = []

//for (var i = 0; i<sortedIds.length; i++ ){
	//http.get('http://www.omdbapi.com/?apikey=7b20f955&i=' + sortedIds[i].id, (res) => {
	http.get('http://www.omdbapi.com/?apikey=7b20f955&i=tt3896198', (res) => {
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
	      initialData.push(movieData)
	    } catch (e) {
	      console.error(e.message)
	    }
	  })
	}).on('error', (e) => {
	  console.error(`Got error: ${e.message}`)
	})
//}

router.get('/', (req, res) => {
	console.log('****** initialData *******', initialData)
	res.render('index', {data: initialData})
})
//get route -> index
//router.get('/', (req,res) => {
		//res.redirect('/my_movies')
//})

//router.get('/movies/search', (req,res) => {
	//express callback response by calling burger.selectAllBurger
	//burger.all((burger_data) => {
		//wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
		//res.render('index', {burger_data})
	//})
//})

//post route -> back to index
//router.post('/movies/create', (req, res) => {
	//takes the request object using it as input for buger.addBurger
	//burger.create(req.body.burger_name, (result) => {
		//wrapper for orm.js that using MySQL insert callback will return a log to console, render back to index with handle
		//console.log(result)
		//res.redirect('/')
	//})
//})

//put route -> back to index
//router.put('/movies/update', (req,res) => {
	//burger.update(req.body.burger_id, (result) => {
		//wrapper for orm.js that using MySQL update callback will return a log to console, render back to index with handle
		//console.log(result)
		//res.redirect('/')
	//})
//})

module.exports = router