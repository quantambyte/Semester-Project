import User from '../models/user'
import jwt from 'jsonwebtoken'

export const signUp = async (req , res) => {
    
    const { name , email ,password } = req.body

    // validation
    if( !name )
        return res.status(400).send('Name is Required')

    if( !password || password.length < 6)
        return res.status(400).send('Password must be at least 6 characters long') 


    // if user is already in database
    let checkUserExist = await User.findOne( {  email} )

    if( checkUserExist)
        return res.status(400).send('You are already Registered! Please Sign In')


    // if user is new and is valid
    const user = new User( req.body )
    try{

        await user.save()
        console.log('User Created' , user);
        return res.json( { ok : true } )

    }catch (err){
        console.log(err);
        return res.status(400).send('Failed to Create new User')
    }
}

export const login = async (req , res) => {
    // console.log(req.body)

    const { email , password } = req.body

    // try to find user
    try{

        // first check if the user exists
        let user = await User.findOne({email}).exec()

        console.log(`${user} exist`)

        if( !user)
            return res.status(400).send('User with that Email Not Found! Please Sign Up')

        // compare passwords
        user.comparePassword ( password , ( err , match ) => {

            // if password doesn't match or some error 
            if( !match || err){
                return res.status(400).send('Invalid Password')
            }

            
            // we will give user id as argument to token so we can easily find which user is logged in
            let token = jwt.sign({_id : user._id} , process.env.JWT_SECRET , { expiresIn: "7d"} )

            // generate a jwt
            console.log(token)

            // sending token and user
            return res.json({token , user : {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }})
            
        } )

    } catch (err){
        console.log(err)
        return res.status(400).send('Login Failed')
    }
}