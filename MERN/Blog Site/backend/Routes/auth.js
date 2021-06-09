const express = require('express')
const router = express.Router()

const { signup, signIn, signOut } = require('../Controllers/auth')

// validators
const { runValidation } = require('../Validators')
const { userSignupValidator , userSignInValidator } = require('../Validators/auth')

router.post('/signup' , userSignupValidator , runValidation, signup)

router.post('/signin' , userSignInValidator , runValidation, signIn)

router.get('/signout', signOut)

// test
router.get('/secret' , (req , res) =>{ 
    res.json({ 
        message: 'You Have Access to Secret Page'
     })
})

module.exports = router;