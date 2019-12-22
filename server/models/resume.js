var mongoose = require('../database')
var Schema = mongoose.Schema

var ResumeSchema = new Schema({
	name: {
		type: String,
	},
	firstName: {
		type: String,
		required: 'Please enter your first name'
	},
	lastName: {
		type: String,
		required: 'Please enter your last name'
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

ResumeSchema.pre('save', function (next) {
	this.name = this.get('firstName') + ' ' + this.get('lastName')
	next()
})

module.exports = mongoose.model('resumes', ResumeSchema)