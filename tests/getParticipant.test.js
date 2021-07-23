const app = require('../app')
const request = require('supertest')
const auth = require('./token')
test('get all null',async()=>{
    const res = await request(app)
                .get('/participant/get/allNull?page=1')
                .set('Authorization',`Bearer ${auth}`)
                .send()

    expect(res.status).toBe(200)
})

test('get all null empty',async()=>{
    const res = await request(app)
                .get('/participant/get/allNull?page=3')
                .set('Authorization',`Bearer ${auth}`)
                .send()

    expect(res.status).toBe(200)
})

test('get all hack',async()=>{
    const res = await request(app)
                .get('/participant/get/all/60f2db965acd8c00152c6072?page=1')
                .set('Authorization',`Bearer ${auth}`)
                .send()

    expect(res.status).toBe(200)
})

test('get all hack empty',async()=>{
    const res = await request(app)
                .get('/participant/get/all/60f2db965acd8c00152c6072?page=3')
                .set('Authorization',`Bearer ${auth}`)
                .send()

    expect(res.status).toBe(404)
})