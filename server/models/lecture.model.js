'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Lecture Schema
 */

var LectureSchema = new Schema({
	page: {
		type: Number
	},
	text: {
		type: Array
	},
	title: {
		type: String
	}
});



mongoose.model('Lecture', LectureSchema);
//module.exports = LectureSchema;