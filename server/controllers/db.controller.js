'use strict'

var mongoose = require('mongoose');
var chalk = require('chalk');
var path = require('path');

/* Mongoose models requirements */
require(path.resolve('./server/models/user.model.js'));

var dbConfig = {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/ritm-tipkovnica-dev',
    options: {
      user: '',
      pass: ''
    }
}; 

mongoose.connect(dbConfig.uri, dbConfig.options, function (err) {
	// Log Error
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(err);
	} else {
		console.log(chalk.green('Connected to MongoDB!'));
	}
});
