'use strict'

var Resume = require('../models/resume')

exports.create = function (req, res) {
	var newResume = new Resume(req.body)
	newResume.save(function (err, doc) {
		res.json({
			err: err,
			data: doc
		})
	})
}

exports.readByID = function (req, res) {
	Resume.findById(req.params.id, function (err, doc) {
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(doc))
	})
}

exports.readByName = function (req, res) {
	Resume.find({
		name : {
			$regex: new RegExp(req.params.name.replace('+', '|')), $options : 'i'
		}
	}, function (err, doc) {
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(doc))
	})
}