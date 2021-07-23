const app = require('../app')
const request = require('supertest')
const auth = require('./token')

test('get hack interested teams',async()=>{
    const res = await request(app).get('/organiser/getTeams/60f1cacb03a7ce0015c93f6b?page=1')
    .set('Authorization','Bearer '+auth).send()

    expect(res.status).toBe(200)
})