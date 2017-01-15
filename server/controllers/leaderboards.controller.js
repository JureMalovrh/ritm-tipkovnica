'use strict'

var mongoose = require('mongoose');
var path = require('path');
var Game = mongoose.model('Game');

exports.getLeaderboards = function (req, res) {
	let sort = (req.query.sort) ? '-'+req.query.sort : '-date';
	Game.find().populate("user").sort("-points").limit(30).exec((err, games) => {
		if(err) {
			res.statusCode = 400;
			return res.json({error: err});
		}
		res.json({message: games});
	})
}
