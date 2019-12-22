var express = require('express'),
	app = express(),
	port = process.env.PORT || 3001,
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cors = require('cors')

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/basic', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


var routes = require('./api/routes')
routes(app)


app.listen(port)


console.log('todo list RESTful API server started on: ' + port)