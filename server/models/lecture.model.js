'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Lecture Schema
 */

// TODO: cleat this up, maybe even remove since we have Profile model. Lecture will probably never get here
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