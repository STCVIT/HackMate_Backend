const app = require('../app')
const request = require('supertest')
const auth = require('./token')
const Project = require('../src/models/Project')

// test('createProject',async()=>{
//     const res = await request(app)
//     .post('/projects/create')
//     .set('Authorization',`Bearer ${auth}`)
//     .send({
//         name:'hackportal',
//         description:'website ....',
//         code:'github.com'
//     })
    
//     expect(res.status).toBe(201)
// })

test('get all Project',async()=>{
    const res = await request(app)
    .get('/projects/getAll')
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(200)
})