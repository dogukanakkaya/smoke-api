process.env.NODE_ENV = 'test'

import app from '../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('Auth API', () => {
    describe('POST /auth/login and /api/me', () => {
        it('should return access_token cookie and logged in user info', async () => {
            const response = await chai.request(app).post('/auth/login').send({ email: 'test@test.com', password: '123456' })
            expect(response).to.have.cookie('access_token')

            // agent not keep cookies so i must set is manually
            const response2 = await chai.request(app).get('/api/me').set('Cookie', response.header["set-cookie"][0])
            expect(response2).to.have.status(200)
        })
    })
})