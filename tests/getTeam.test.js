const app = require('../app')
const request = require('supertest')
const auth = require('./token')

test('get Team',async()=>{
    const res = await request(app)
    .get(`/DN_Team/teamName/${null}?name=abcd`)
    .set('Authorization','Bearer '+auth)
    .send()
    expect(res.status).toBe(404)
})