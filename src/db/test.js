const mongoose = require('mongoose')

const Test = require('../models/Test')
// const conn = require('./mongoose')

const test = async()=>{

    // const session = await mongoose.startSession()
    // await session.startTransaction()

    try {
        const one = new Test({name:'Deep'}) //{ session: session });
        const two = new Test({ name: 'Dwija' })// { session: session });
        await one.save()
        await two.save()
        console.log('hi')
        //await session.commitTransaction()
        //session.endSession()
    } catch (e) {
       // await session.abortTransaction()
        // session.endSession()
        console.log(e)
    }

}
test()