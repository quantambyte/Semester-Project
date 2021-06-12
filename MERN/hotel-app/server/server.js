
import express from 'express'
import { readdirSync } from 'fs'
require('dotenv').config()
import cors from 'cors'
import mongoose from 'mongoose'

// we can't use import with morgan package D:
const morgan = require('morgan')

const app = express()

// database connection
mongoose.connect(process.env.DB , { useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true}).then( () => console.log('Connected to DB')).catch( (err) => console.log(err))

// middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) //when we will receive response the output object will be of undefined so we need to use express.json to convert it into json or we can also use body-parser

// routes middleware
readdirSync( './routes' ).map( (file) => {
    app.use('/api' , require(`./routes/${file}`))
} )

app.listen( process.env.PORT || 8001 , () => console.log(`server is running on port ${process.env.PORT}`))