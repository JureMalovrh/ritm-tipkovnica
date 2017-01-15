'use strict'

var mongoose = require('mongoose');
var path = require('path');
var Game = mongoose.model('Game');

exports.getLeaderboards = function (req, res) {
	let sort = (req.query.sort) ? '-'+req.query.sort : '-date';
	let level = (req.query.level) ? req.query.level : 1;
	let userId = req.params.user;
	Game.find({user: userId, level: level}).sort(sort).limit(10).exec((err, games) => {
		if(err) {
			res.statusCode = 400;
			return res.json({error: err});
		}
		res.json({message: games});
	})
}
