'use strict'

var Resume = require('../models/resumeModel')

exports.create = function (req, res) {
	var newResume = new Resume(req.body)
	newResume.save(function (err, doc) {
		if (err)
			res.send(err)
		res.json(doc)
	})
}

exports.readByID = function (req, res) {
	Resume.findById(req.params.id, function (err, doc) {
		if (err)
			res.send(err)
		res.json(doc)
	})
}

exports.readByName = function (req, res) {
	Resume.findById(req.params.id, function (err, doc) {
		if (err)
			res.send(err)
		res.json(doc)
	})
}