const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/basic', { useNewUrlParser: true })

module.exports = mongoose