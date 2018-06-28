const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MovieSchema = new Schema({
	Genre:{
		type: String,
		trim: true
	},
	Actors:{
		type: String,
		trim: true
	},
	Title:{
		type: String,
		trim: true
	},
	Year:{
		type: String,
		trim: true
	},
	Rating:{
		type: Object,
	}
})

const Movies = mongoose.model('Movies', MovieSchema)

module.exports = Movies