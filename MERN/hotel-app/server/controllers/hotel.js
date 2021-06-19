import Hotel from "../models/hotel";
import fs from "fs";

export const createHotel = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);

    // handle image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    hotel.save((err, result) => {
      if (err) {
        console.log("Error Saving Hotel");
        return res.status(400).send("Enter all Details! Failed to Save Hotel");
      }

      return res.json(result);
    });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      err: err.message,
    });
  }
};

export const showHotels = async (req, res) => {
  let hotels = await Hotel.find({})
    .limit(20)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  // console.log(hotels);
  return res.json(hotels);
};

export const returnImage = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();

  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const sellerHotels = async (req, res) => {
  let all = await Hotel.find({ postedBy: req.user._id })
    .select("-image-data")
    .populate("postedBy", "_id name")
    .exec();

  console.log(all);
  return res.json(all);
};