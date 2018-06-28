var mongoose = require('mongoose')

var Schema = mongoose.Schema

var MovieSchema = new Schema({
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