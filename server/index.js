var server = require('./server'),
	PORT = process.env.PORT || 3001

server.listen(PORT, () => console.log(`Server is live at localhost:${ PORT }`))