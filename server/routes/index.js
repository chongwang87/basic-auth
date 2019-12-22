const { Router } = require('express'),
	auth = require('../controllers/auth'),
	resume = require('../controllers/resume'),
	router = Router()

router.post('/v1/auth/signUp', auth.signUp)
router.post('/v1/auth/signIn', auth.signIn)
router.post('/v1/auth/signOut/:token', auth.signOut)

router.post('/uploadResumeDetails', resume.create)
router.get('/getResumeById/:id', resume.readByID)
router.get('/getResumeByName/:name', resume.readByName)

module.exports = router