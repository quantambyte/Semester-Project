import express from "express";
const router = express.Router();

// controllers
import { signUp, login } from "../controllers/auth";

// sign up route
router.post("/signup", signUp);

// login route
router.post("/login", login);

module.exports = router;
