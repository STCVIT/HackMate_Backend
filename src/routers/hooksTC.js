// const Test = require('../models/test')
// const mongoose = require('mongoose')
// require('../db/mongoose')

// const make = async()=>{
//     const tp = new Test({name:'testing'})
//     await tp.save()
//     console.log(tp)
// }

// const rem = async()=>{
//     const session = await mongoose.startSession()
//    session.withTransaction(async()=>{
//         try {
//             const tp = await Test.findById('611b675c39f9720704e7e0b1')
//             tp.remove({session})
//             console.log('done') 
//         } catch (e) {
//             console.log(e)
//         }
//     })   
// }
//  rem()
// //make()