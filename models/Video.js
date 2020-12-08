const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videochema = new Schema({
	uid:Schema.Types.ObjectId,
	video: String,
	headlineText: String,
	additionalText: String,
	buttonText: String,
	buttonLink: String,
	date:String
})

module.exports = Video = mongoose.model('video', videochema);