'use strict'

var mongoose = require('mongoose');
var path = require('path');
var User = mongoose.model('User');

exports.signin = function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if(!username || !password) {
		res.statusCode = 400;
		return res.json({message: 'Username or password not present'});
	}

	User.findOne({username: username}).exec((err, user) => {
		if(err) {
			res.statusCode = 400;
			return res.json({message: err});
		}

		if(!user) {
			res.statusCode = 404;
			return res.json({message: 'No user found'});
		}

		if(user.authenticate(password)){
			user.password = undefined;
			user.salt = undefined;

			return res.json({user: user});
		} else {
			res.statusCode = 401;
			res.json({message: "Wrong username or password"});
		}

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