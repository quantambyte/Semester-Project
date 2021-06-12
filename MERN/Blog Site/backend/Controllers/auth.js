const User = require('../Models/user')
const shortId = require('shortid')
const jwt = require( 'jsonwebtoken')
const expressJwt = require('express-jwt')
const user = require('../Models/user')


exports.signup = (req , res) => {
    
    // checking if the user is already registered/signed up
    User.findOne( {email: req.body.email} ).exec( (err, user) => {
        if( user){
            return res.status(400).json( {
                error: 'Email is Already Taken'
            })
        }

        const { name , email ,password} = req.body

        // generate a unique username
        let username = shortId.generate()

        // generating the profile url
        let profile = `${process.env.CLIENT_URL}/profile/${username}`


        let newUser = new User( {name , email , password, profile , username} )

        // save the user
        newUser.save( (err, success) => {

            if( err){
                return res.status(400).json( {
                    error: err
                })
            }

            res.json( {
                message: 'Congratulations You have Successfully Signed up! '
            })
        })
    } )

}

exports.signIn = ( req , res  ) =>{

    const { email , password } = req.body
    // check if user exists
    User.findOne( {email}).exec( (err, user) => {

        if( err || !user){
            return res.status(400).json( {
                error: 'User With that Email does not exist, Please Sign Up'
            })
        }


        // authentication
        if ( !user.authenticate(password) ){
            return res.status(400).json( {
                error: 'Email and Password do not match'
            })
        }

        // generate a token and send to client
        const token = jwt.sign( {_id: user._id} , process.env.JWT_SECRET_KEY , {expiresIn : '1d'})

        // also save same token in cookie
        res.cookie('token' , token , {expiresIn: '1d'})
        const { _id , username , name ,email,  role} = user

        return res.json( {
            token,
            user: { _id , username , name ,email,  role}
        })

    })

}


// sign out
exports.signOut = (req , res) => {

    res.clearCookie('token')

    res.json({
        message: 'Signed Out'
    })

}

// middleware
// this will automatically check if our generated token is expired or not
// exports.requireSignIn = expressJwt( { 
//     secret: 'lol'
// } )
