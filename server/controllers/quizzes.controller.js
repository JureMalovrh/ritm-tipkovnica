'use strict'

var mongoose = require('mongoose');
var path = require('path');
var Lecture = mongoose.model('Lecture');
var Quiz = mongoose.model('Quiz');

exports.getLecturesPage = function (req, res) {
	console.log(req.params.page);
	let page = req.params.page;
	Lecture.findOne({page: page}).exec(function(err, lecture) {
		if(err) {
			res.statusCode = 400;
			return res.json({message: err});
		}
		res.json({message: lecture});
	});
};

exports.getLectureQuiz = function (req, res) {
	console.log(req.params.page);
	let page = req.params.page;
	Quiz.findOne({page: page}).exec(function(err, quiz) {
		if(err) {
			res.statusCode = 400;
			return res.json({message: err});
		}
		res.json({message: quiz});
	});
};

exports.checkQuiz = function (req, res) {
	
	let quizId = req.params.quizId;

	Quiz.findById(quizId).exec(function(err, quiz) {
		if(err) {
			res.statusCode = 400;
			return res.json({message: err});
		}
		//console.log(req.body.answer, quiz.correctAnswer)
		if(quiz.correctAnswer == req.body.answer) {
			res.json({check: true});
		} else {
			res.json({check: false, correctAnswer: quiz.correctAnswer});
		}
	});
};