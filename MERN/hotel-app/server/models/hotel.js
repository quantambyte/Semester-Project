import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const hotelSchema = new Schema(
  {
    title: {
      type: String,
      required: "Please Enter Name of Hotel",
    },
    content: {
      type: String,
      required: "Please Enter Details of Hotel",
      maxlength: 10000,
    },
    location: {
      type: String,
    },
    price: {
      type: Number,
      required: "Enter Price of Hotel",
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    bed: {
      type: Number,
      required: "Enter Number of Beds",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
