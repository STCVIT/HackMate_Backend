const app = require('../app')
const request = require('supertest')
const auth = require('./token')

// jest.setTimeOut(10000)

test('create hack team',async()=>{
    const res = await request(app)
    .post('/DN_Team/createTeam/60f1cacb03a7ce0015c93f6b')
    .set('Authorization','Bearer '+auth)
    .send({
        name:'hehe'
        
    })
    expect(res.status).toBe(201)
})

test('create hack team',async()=>{
    const res = await request(app)
    .post('/DN_Team/createTeam/null')
    .set('Authorization','Bearer '+auth)
    .send({
        name:'hehe-null'
    })
    expect(res.status).toBe(201)
})

// test('create hack team',async()=>{
//     const res = await request(app)
//     .post('/DN_Team/createNull')
//     .set('Authorization','Bearer '+auth)
//     .send({
//         name:'hehe'
//     })
//     expect(res.status).toBe(201)
// })