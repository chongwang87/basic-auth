'use strict'

module.exports = function (app) {
	var auth = require('../controllers/authController'),
		resume = require('../controllers/resumeController')

	app.route('/api/v1/uploadResumeDetails')
		.post(resume.create)

	app.route('/api/v1/getResumeById/:id')
		.get(resume.readByID)

	app.route('/api/v1/getResumeByName/:id')
		.get(resume.readByName)

	app.route('/api/v1/auth/signIn')
		.post(auth.signIn)

	app.route('/api/v1/auth/signUp')
		.post(auth.signUp)

	app.route('/api/v1/auth/signOut/:token')
		.post(auth.signOut)
}
