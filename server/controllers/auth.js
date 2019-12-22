'use strict'

var SHA256 = require('sha256'),
	Random = require('meteor-random'),
	Account = require('../models/account')

exports.signUp = function (req, res) {
	var newAccount = new Account({
		services : {
			password: SHA256(req.body.password),
			token : Random.secret()
		},
		email: req.body.email
	})
	newAccount.save(function (err, doc) {
		res.json({
			err : err,
			data: doc
		})
	})
}

exports.signIn = function (req, res) {
	Account.findOne({
		email : req.body.email
	}, function (err, doc) {
		
		var password = SHA256(req.body.password)
		res.json({
			err: err || !doc || (!err && doc && doc.services && doc.services.password !== password),
			data: (!err && doc && doc.services && doc.services.password == password) ? doc : null
		})
	})
}

exports.signOut = function (req, res) {
	Account.findOneAndUpdate({ 'services.token' : req.params.token }, {
		$pull : {
			'services.token': { token: req.params.token }
		}
	}, { new: true }, function (err, doc) {
		res.json({
			err: err,
			data: doc
		})
	})
}