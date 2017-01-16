'use strict'

var mongoose = require('mongoose');
var path = require('path');
var Achievement = mongoose.model('Achievement');

exports.addNewAchievement = function (req, res) {
	let achievement = new Achievement(req.body);
	
	Achievement.findOne({user: achievement.user, text: achievement.text}).exec((err, _achievement) => {
		if(!err && !_achievement) {
			achievement.save((err, achievement) => {
				if(err) {
					res.statusCode = 400;
					return res.json({error: err});
				}
				res.json({message: achievement});
			});
		} else {
			return res.json({message: _achievement})
		}
	
	})
	
};

exports.getUserAchievements = function (req, res) {
	let userId = req.params.user;
	Achievement.find({user: userId}).sort('-date').exec((err, achievements) => {
		if(err) {
			res.statusCode = 400;
			return res.json({error: err});
		}
		res.json({message: achievements});
	})
}
