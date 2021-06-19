import express from "express";
const router = express.Router();

// middleware
import formidable from "express-formidable";
import { requireSignIn } from "../middlewares";

// controllers
import {
  createHotel,
  showHotels,
  returnImage,
  sellerHotels,
} from "../controllers/hotel";

// create hotel
router.post("/hotels/addNew", requireSignIn, formidable(), createHotel);

// get hotels
router.get("/hotels", showHotels);

// get hotel image
router.get("/hotel/image/:hotelId", returnImage);

// hotels of each user
router.get("/seller-hotels", requireSignIn, sellerHotels);

module.exports = router;
