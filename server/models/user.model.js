'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	validator = require('validator');

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
	return validator.isEmail(email, { require_tld: false });
};

/**
 * User Schema
 */

// TODO: cleat this up, maybe even remove since we have Profile model. User will probably never get here
var UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		default: '',
		required: 'Provide first name'
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
		required: 'Provide last name'
	},
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		lowercase: true,
		trim: true,
		default: '',
		validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
	},
	username: {
		type: String,
		unique: 'Username already exists',
		required: 'Please fill in a username',
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		default: ''
	},
	salt: {
		type: String
	},

	created: {
		type: Date,
		default: Date.now
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
	if (this.password && this.isModified('password')) {
		this.salt = crypto.randomBytes(16).toString('base64');
		this.password = this.hashPassword(this.password);
	}

	this.displayName = this.firstName +' '+ this.lastName;

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);
//module.exports = UserSchema;