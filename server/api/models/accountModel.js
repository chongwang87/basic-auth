'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema


var AccountSchema = new Schema({
	services: {
		type: {
			password : String,
			token: String
		}
	},
	email: {
		type: String,
		index: true,
		unique: true,
		required: 'Please enter your job description'
	}
}, { typePojoToMixed: false })

module.exports = mongoose.model('accounts', AccountSchema)