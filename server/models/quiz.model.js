'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Quiz Schema
 */

var QuizSchema = new Schema({
	lecture: {
		type: Schema.ObjectId,
		ref: 'Lecture',
		required: 'Provide Quiz lecture'
	},
	text: {
		type: String
	},
	page: {
		type: Number
	},
	
	correctAnswer: {
		type: String
	},

	wrongAnswers: {
		type: Array
	},

	mixedAnswers: {
		type: Array
	}
});

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

QuizSchema.pre('save', function(next) {
	let _this = this;
	l
	let answersArray = [_this.correctAnswer];
	if(_this.wrongAnswers) {
		answersArray.concat(_this.wrongAnswers);
	}

	shuffle(answersArray);
	_this.mixedAnswers = answersArray;
	next();
});


mongoose.model('Quiz', QuizSchema);
//module.exports = QuizSchema;