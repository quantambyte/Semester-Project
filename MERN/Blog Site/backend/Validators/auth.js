
const { check } = require('express-validator')

exports.userSignupValidator = [

    check('name').not().isEmpty().withMessage('Name is Required'),

    check('email').isEmail().withMessage('Please Enter a Valid Email'),

    check('password').isLength( {min: 6} ).withMessage('Password must be at least 6 characters long')
]

exports.userSignInValidator = [

    check('email').isEmail().withMessage('Please Enter a Valid Email'),

    check('password').isLength( {min: 6} ).withMessage('Password must be at least 6 characters long')
]