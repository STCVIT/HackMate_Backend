const app = require('../app')
const request = require('supertest')
const auth = require('./token')

test('getAll',async()=>{
    const res = await request(app)
    .get('/getHacks/all?page=1')//or 2,3 since 17 hacks
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(200)
})

test('getAll',async()=>{
    const res = await request(app)
    .get('/getHacks/all?page=4')//or 2,3 since 17 hacks
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(404)
})

test('getAll',async()=>{
    const res = await request(app)
    .get('/getHacks/all?page=4')//or 2,3 since 17 hacks
    .send()
    
    expect(res.status).toBe(401)
})

test('get ongoing',async()=>{
    const res = await request(app)
    .get('/getHacks/ongoing?page=1')//or 2 since 7 hacks
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(200)
})

test('get ongoing',async()=>{
    const res = await request(app)
    .get('/getHacks/ongoing?page=3')//or 2 since 7 hacks
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(404)
})

test('get upcoming',async()=>{
    const res = await request(app)
    .get('/getHacks/upcoming?page=1')//since 4 hacks
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(200)
})

test('get upcoming',async()=>{
    const res = await request(app)
    .get('/getHacks/upcoming?page=2')//since 4 hacks
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(404)
})

test('get popularity',async()=>{
    const res = await request(app)
    .get('/getHacks/popularity?page=1')//4 hacks
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(200)
})

test('get popularity',async()=>{
    const res = await request(app)
    .get('/getHacks/popularity?page=2')//4 hacks
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(404)
})

test('get ongoing',async()=>{
    const res = await request(app)
    .get('/getHacks/ongoing?page=1')//or 2 since 7 hacks
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(200)
})

test('get ongoing',async()=>{
    const res = await request(app)
    .get('/getHacks/ongoing?page=3')//or 2 since 7 hacks
    .set('Authorization',`Bearer ep[f]`)//rubbish or wrong auth
    .send()
    
    expect(res.status).toBe(401)
})

test('get by id',async()=>{
    const res = await request(app)
    .get('/getHacks/60f2db965acd8c00152c6072')//right id
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(200)
})

test('get by id',async()=>{
    const res = await request(app)
    .get('/getHacks/60f2db965acd8c00152c6071')//wrong id
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(404)
})

test('get by id',async()=>{
    const res = await request(app)
    .get('/getHacks/60f2db965')//rubbish id
    .set('Authorization',`Bearer ${auth}`)
    .send()
    
    expect(res.status).toBe(400)
})
