'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Solve Schema
 */

var SolveSchema = new Schema({
	quiz: {
		type: Schema.ObjectId,
		ref: 'Quiz',
		required: 'Provide Solve quiz'
	},	
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'Provide Solve user'
	},
	answer: {
		type: String,
		required: 'Provide Solve answer'
	},
	correctAnswer: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});


mongoose.model('Solve', SolveSchema);
//module.exports = SolveSchema;