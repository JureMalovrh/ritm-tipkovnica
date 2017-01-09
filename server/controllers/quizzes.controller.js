'use strict'

var mongoose = require('mongoose');
var path = require('path');
var Lecture = mongoose.model('Lecture');

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

exports.register = function (req, res) {
	let user = new User(req.body);
	user.save((err) => {
		if(err) {
			res.statusCode = 400;
			return res.json({message: err});
		} else {
			user.password = undefined;
			user.salt = undefined;
			res.json({user: user});
		}
	});

}