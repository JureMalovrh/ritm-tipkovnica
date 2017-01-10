'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Game Schema
 */

var GameSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'Provide Game user'
	},
	points: {
		type: Number,
		required: 'Provide Game points'
	},
	allPoints: {
		type: Number,
		required: 'Provide Game allPoints'
	},
	level: {
		type: Number,
		required: 'Provide Game level'
	},
	date: {
		type: Date,
		default: Date.now
	}
});


mongoose.model('Game', GameSchema);
//module.exports = GameSchema;