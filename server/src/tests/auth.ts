//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { assert } from 'console'
import app from '../app'

chai.use(chaiHttp)

const agent = chai.request.agent(app)

describe('Auth API', () => {
    describe('POST /auth/login and /api/me', () => {
        it('should return access_token cookie and logged in user info', async () => {
            const response = await agent.post('/auth/login').send({ email: 'test@test.com', password: '123456' })
            expect(response).to.have.cookie('access_token')

            // agent not keep cookies so i must set is manually
            const response2 = await agent.get('/api/me').set('Cookie', response.header["set-cookie"][0])
            expect(response2).to.have.status(200)
        })
    })
})