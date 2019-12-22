const express = require('express'),
	cors = require('cors'),
	server = express(),
	routes = require('../routes')

server.use(express.json())
server.use(cors())

server.use('/api/v1', routes)

module.exports = server