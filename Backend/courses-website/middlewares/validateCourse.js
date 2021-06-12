const { validateCourse } = require('../models/courses')

const checkValidity = ( req , res , next ) => {

    let {error} = validateCourse(req.body)
    if( error){
        return res.status(400).send(error.details[0].message)
    }

    next()
}

module.exports = checkValidity;