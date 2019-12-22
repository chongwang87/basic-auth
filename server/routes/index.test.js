var faker = require('faker'),
	request = require('supertest'),
	server = require('../server'),
	SHA256 = require('sha256'),
	Random = require('meteor-random')

var email = faker.internet.email(),
	password = Random.secret()
	
describe('Account Endpoints', () => {
	it('should sign up & hashed password', async done => {
		var res = await request(server)
			.post('/api/v1/auth/signUp')
			.send({
				email: email,
				password : password
			})

		expect(res.body.data.email).toEqual(email)
		expect(res.body.data.services.password).toEqual(SHA256(password))

		done()
	})

	it('should sign in', async done => {
		var res = await request(server)
			.post('/api/v1/auth/signIn')
			.send({
				email: email,
				password: password
			})
		
		expect(res.statusCode).toEqual(200)

		done()
	})
})