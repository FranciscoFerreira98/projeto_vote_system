const request = require('supertest')
const route = require('../app/routes/auth.routes');

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(route)
      
            .post('/api/auth/signin')
            .send({
                email: "franciscoferreir98@gmail.com",
                password: "admin123"
            })
           
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('post')
    })
})
