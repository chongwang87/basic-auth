'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema


var ResumeSchema = new Schema({
	name: {
		type: String,
		required: 'Please enter your name'
	},
	jobTitle: {
		type: String,
		required: 'Please enter your job title'
	},
	jobDesc: {
		type: String,
		required: 'Please enter your job description'
	},
	currentCompany: {
		type: String,
		required: 'Please enter your currentl job company'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('resumes', ResumeSchema)