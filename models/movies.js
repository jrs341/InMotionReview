const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MovieSchema = new Schema({
	id:{
		type: String,
		trim: true
	},
	title:{
		type: String,
		trim: true
	},
	myRating:{
		type: String,
		trim: true
	}
})

const Movies = mongoose.model('Movies', MovieSchema)

module.exports = Movies