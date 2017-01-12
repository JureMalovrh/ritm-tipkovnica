'use strict'

var mongoose = require('mongoose');
var path = require('path');
var Achievement = mongoose.model('Achievement');

exports.addNewAchievement = function (req, res) {
	let achievement = new Achievement(req.body);
	achievement.save((err, achievement) => {
		if(err) {
			res.statusCode = 400;
			return res.json({error: err});
		}
		res.json({message: achievement});
	}); 
};

exports.getUserAchievements = function (req, res) {
	let userId = req.param.user;
	Achievement.find({user: userId}).sort('-date').exec((err, achievements) => {
		if(err) {
			res.statusCode = 400;
			return res.json({error: err});
		}
		res.json({message: achievements});
	})
}