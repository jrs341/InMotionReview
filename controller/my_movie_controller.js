const axios = require('axios')
const express = require('express')
const router = express.Router()
const Movies = require('../models/movies.js')

sortByTitle = (a,b) => {
	if (a.title > b.title)
		return -1
	if (a.title < b.title)
		return 1
	return 0
}

router.get ('/', async (req, res) => {
	const initialData = await axios.get ('https://api.mlab.com/api/1/databases/inmotion/collections/movies?apiKey=xBN2j2F0BU9C9AlgWOLzP0tLZKsATO1W')
	res.render ('index', {data: initialData.data})
})

router.get('/search', async (req, res) => {
	let data
	data = await Movies.find({$text: { $search: req.query.search}}, (error, doc) => {
		if(error) {
			return error
		} else {
			return doc
		}
	})
	res.render('', {data: data})
})

module.exports = router


// ******** I used the following code to seed the database incase anyone is interested **********
//for (var i = 0; i <= 300; i++ ){
	//randomId = Math.trunc(Math.random() * 9000000)
	//http.get('http://www.omdbapi.com/?apikey=7b20f955&i=tt' + randomId, (res) => {
	  //const { statusCode } = res
	  //const contentType = res.headers['content-type']

	  //let error
	  //if (statusCode !== 200) {
	    //error = new Error('Request Failed.\n' +
	        //`Status Code: ${statusCode}`)
	  //} else if (!/^application\/json/.test(contentType)) {
	   // error = new Error('Invalid content-type.\n' +
	        //`Expected application/json but received ${contentType}`)
	  //}
	  //if (error) {
	    //console.error('***** omdb error ******', error.message)
	    // consume response data to free up memory
	    //res.resume()
	    //return;
	  //}

	  //res.setEncoding('utf8')
	  //let rawData = ''
	  //res.on('data', (chunk) => { rawData += chunk })
	  //res.on('end', () => {
	    //try {
	      //const parsedData = JSON.parse(rawData)
	  	//if (parsedData.Title.split(' ')[0] != 'Episode') {
	  		//const movies = new Movies()
			//movies.title = parsedData.Title
	  		//movies.genre = parsedData.Genre
	  		//movies.actors = parsedData.Actors
	  		//movies.ratings = parsedData.Ratings
	  		//movies.year = parsedData.Year
	  		//movies.imdbId = parsedData.imdbID
		//if (parsedData.Response == 'True') {
			//axios.post('https://api.mlab.com/api/1/databases/inmotion/collections/movies?apiKey=xBN2j2F0BU9C9AlgWOLzP0tLZKsATO1W', movies)
	  	//.then(res => {
	  		//console.log('**** axios res *****', res.status)
	  	//})
	  	//.catch(err => {
	  		//console.log('***** axios err *****', err)
	  	//})
		//}
	  	//}
	    //} catch (e) {
	      //console.error('**** error message1 *****',e.message)
	    //}
	  //})
	//}).on('error', (e) => {
	  //console.error(`Got error: ${e.message}`)
	//})