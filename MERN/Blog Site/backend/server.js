// importing packages
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()


// routes
const blogRoutes = require('./Routes/blog')
const authRoutes = require('./Routes/auth')


// creating app
const app = express()


// connecting to database
mongoose
    .connect( process.env.LOCAL_DATABASE , { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log('Connected to database'))

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())  
app.use(cookieParser())

// routes middleware
app.use( '/api', blogRoutes)
app.use( '/api', authRoutes)

// cors
// we need cors in order to connect the frontend with backend as the browser don't allow the separate ports communication
if( process.env.ENV === 'development'){
    app.use(cors( {origin: `${process.env.CLIENT_URL}`} ))
}


// port
const port = process.env.PORT || 8000
app.listen(port , () => {
    console.log(`Server is running at ${port}`);
})