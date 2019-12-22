const express = require('express'),
	server = express(),
	cors = require('cors'),
	routes = require('../routes')

server.use(express.json())
server.use(cors())
server.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

server.use('/api', routes)

module.exports = server