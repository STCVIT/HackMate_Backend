const app = require('../app')
const request = require('supertest')

const auth = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3MTBiMDE3ZmQ5YjcxMWUwMDljNmMzNmIwNzNiOGE2N2NiNjgyMTEiLCJ0eXAiOiJKV1QifQ.eyJwYXJ0aWNpcGFudCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2hhY2twb3J0YWwtNDUwZDAiLCJhdWQiOiJoYWNrcG9ydGFsLTQ1MGQwIiwiYXV0aF90aW1lIjoxNjI2NTg5MDk2LCJ1c2VyX2lkIjoieHRJd0o4VWpoaVZDUDhJQUdFZGxyZ0I1TmloMSIsInN1YiI6Inh0SXdKOFVqaGlWQ1A4SUFHRWRscmdCNU5paDEiLCJpYXQiOjE2MjY1ODkwOTYsImV4cCI6MTYyNjU5MjY5NiwiZW1haWwiOiJhbmVlc2hwYW5kYS5hcEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbmVlc2hwYW5kYS5hcEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.EVy1k_tpzMKg5C6pIJXX3ZXD7QArAOE36ntw1HrhBf_F9pkFiEgG1kMFwjsIlzFfe6zEzVZ43AGG0fDnFNqlqwn5B1BQ0mce5r30koGuZTQ50M40frv1VHnuSTD1e3MWrf3Pe07nhV32rJ2dplDWsEp905VfSpry1mSbfQaC3b_10dMqNRej94hIfMQnPQrOtvrMcoU4tp-SsyhBQTe5-p8XKbXDOctuBCpcQZuogoWagy6xTaw1bpf11-NdXq8Hl2NE8UBcJbvuAQFIut2lvjXWuzX4-pgecnEQX7zgYIytQRJRcS3KIHhXhKUTSXyRCzqkkEm3Euj4X2hpJMszQA'

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
