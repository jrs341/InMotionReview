var express = require('express')
var router = express.Router()
var movies = require('../models')

//get route -> index
router.get('/', (req,res) => {
		res.redirect('/my_movies')
})

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
})

module.exports = router