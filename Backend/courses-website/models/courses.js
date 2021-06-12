const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

let coursesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
    },
    addedOn:{
        type: Date,
        default: Date.now()
    },
    image: {
        type: String,
    }
})

let Course = mongoose.model('Course' , coursesSchema) 


const validateCourse = ( data ) => {

    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        author: Joi.string().min(5).max(32).required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().required(),
        // addedOn: Joi.date().default(date.now())
    })

    return schema.validate(data , { abortEarly: false })

}

module.exports.Course = Course
module.exports.validateCourse = validateCourse