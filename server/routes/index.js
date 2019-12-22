const { Router } = require('express'),
	auth = require('../controllers/authController'),
	resume = require('../controllers/resumeController'),
	router = Router()

router.post('/auth/signIn', auth.signIn)
router.post('/auth/signUp', auth.signUp)
router.post('/auth/signOut/:token', auth.signOut)

router.post('/uploadResumeDetails', resume.create)
router.get('/getResumeById/:id', resume.readByID)
router.get('/getResumeByName/:id', resume.readByName)

module.exports = router