const app = require('../app')
const request = require('supertest')
const auth = require('./token')
const Skill = require('../src/models/Skill')

// test('post proper',async()=>{
//     const res = await request(app)
//                 .post('/skills/mySKills')
//                 .set('Authorization',`Bearer ${auth}`)
//                 .send({
//                     skills:["ml","frontend","backend"]
//                 })
//     expect(res.status).toBe(201)
// })

// afterEach(async()=>{
//     await Skill.deleteMany()
// })