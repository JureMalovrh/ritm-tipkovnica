'use strict'

var mongoose = require('mongoose');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/* Mongoose models requirements */
let models = fs.readdirSync(path.resolve('./server/models/'));
models.forEach(function (model) {
	require(path.resolve('./server/models/'+model));
})
//console.log(models);

var dbConfig = {
    uri: process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/ritm-tipkovnica-dev',
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
