'use strict';

var mongoose = require('mongoose');
var path = require('path');
var Lecture = mongoose.model('Lecture');
var Quiz = mongoose.model('Quiz');
var Solve = mongoose.model('Solve');

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
	const user = req.body.user;
	const answer = req.body.answer;

	Quiz.findById(quizId).exec(function(err, quiz) {
		if(err) {
			res.statusCode = 400;
			return res.json({message: err});
		}
		//console.log(req.body.answer, quiz.correctAnswer)
		let solve = new Solve({
			quiz: quiz._id,
			user: user,
			answer: answer,
			correctAnswer: quiz.correctAnswer
		});

		if(quiz.correctAnswer == req.body.answer) {
			res.json({check: true});
			solve.save((err) => {
				if(err) {
					console.log("Solve save", err);
				}
			});

		} else {
			res.json({check: false, correctAnswer: quiz.correctAnswer});
			solve.save((err) => {
				if(err) {
					console.log("Solve save", err);
				}
			});
		}
	});
};

exports.checkIfQuizIsSolved = function (req, res) {
	let quizId = req.params.quizId;
	let userId = req.query.user;

	Solve.find({quiz: quizId, user: userId}).exec((err, solve) => {
		if(err) {
			res.statusCode = 400;
			res.json({error: err});
		} else {
			res.json({message: solve[0]});
		}
	});
}