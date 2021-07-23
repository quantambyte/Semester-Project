import express from "express";
const router = express.Router();

// middleware
import formidable from "express-formidable";
import { requireSignIn, hotelOwner } from "../middlewares";

// controllers
import {
  createHotel,
  showHotels,
  returnImage,
  sellerHotels,
  remove,
  read,
  update,
} from "../controllers/hotel";

// create hotel
router.post("/hotels/addNew", requireSignIn, formidable(), createHotel);

// get hotels
router.get("/hotels", showHotels);

// get hotel image
router.get("/hotel/image/:hotelId", returnImage);

// hotels of each user
router.get("/seller-hotels", requireSignIn, sellerHotels);

// delete hotel
router.delete("/delete-hotel/:hotelId", requireSignIn, hotelOwner, remove);

// get a single hotel
router.get("/hotel/:hotelId", read);

// update hotel
router.put(
  "/update-hotel/:hotelId",
  requireSignIn,
  hotelOwner,
  formidable(),
  update
);

module.exports = router;
