const app = require('../app')
const request = require('supertest')
const auth = require('./token')

//60f647fd7aa44d77a0dc2805

// test('request',async()=>{
//     const res = await request(app)
//     .post('/requests/request/60f647fd7aa44d77a0dc2805')
//     .set('Authorization',`Bearer ${auth}`)
//     .send()

//     expect(res.status).toBe(201)
// })

test('request',async()=>{
    const res = await request(app)
    .post('/requests/requestStatus/accepted/60f90b02d5c75a37400c0919')
    .set('Authorization',`Bearer ${auth}`)
    .send()

    expect(res.status).toBe(401)
})