const app = require('../app')
const request = require('supertest')
const auth = require('./token')
const Skill = require('../src/models/Skill')
//const { TestWatcher } = require('jest')

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

test('Adding skill vacancy',async()=>{
    const res = await request(app)
    .post('/DN_Team/addSkills/60f647fd7aa44d77a0dc2805')
    .set('Authorization',`Bearer ${auth}`)
    .send({
        skills:['ml','ui/ux','appdev']
    })

    expect(res.status).toBe(201)
})