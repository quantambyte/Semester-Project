import express from 'express';
const router = express.Router()

// controllers
import { createConnectAccount } from '../controllers/stripe'

// middleware
import { requireSignIn } from '../middlewares'

// sign up route
router.post('/create-connect-account' , requireSignIn, createConnectAccount)


module.exports = router