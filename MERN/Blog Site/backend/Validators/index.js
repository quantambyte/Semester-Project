
const { validationResult } = require('express-validator')
const { errors } = require('formidable')


// next is a callback 
exports.runValidation = ( req , res , next) => {

    const errors = validationResult( req)

    if ( !errors.isEmpty() ){

        return res.status(422).json( {error: errors.array()[0].msg } )

    }

    next()
}