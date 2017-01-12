'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Achievement Schema
 */

var AchievementSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'Provide Achievement user'
	},
	text: {
		type: String,
		required: 'Provide Achievement text'
	},
	description: {
		type: String,
		required: 'Provide Achievement description'
	},
	
	date: {
		type: Date,
		default: Date.now
	}
});


mongoose.model('Achievement', AchievementSchema);
//module.exports = AchievementSchema;