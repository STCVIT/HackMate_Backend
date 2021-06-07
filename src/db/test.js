const mongoose = require('mongoose')

const Test = require('../models/Test')
const connection = require('./mongoose')

const test = async()=>{

    const session = await connection.startSession()
    await session.startTransaction()

    try {
        const one = new Test({name:'Deep'},{ session: session });
        const two = new Test({ name: 4 },{ session: session });
        await one.save()
        await two.save()
        console.log('hi')
        await session.commitTransaction()
        session.endSession()
    } catch (e) {
       await session.abortTransaction()
        session.endSession()
        console.log(e)
    }

}
test()