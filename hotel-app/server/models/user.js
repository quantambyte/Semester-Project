import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true, //removes extra white spaces
      required: "Name is Required",
    },
    email: {
      type: String,
      trim: true, //removes extra white spaces
      required: "Email is Required",
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 32,
    },
    stripeAccountID: "",
    stripeSeller: {},
    stripeSession: {},
  },
  { timestamps: true }
); // it will automatically add two fields in db one is created at date and other one is updated at date

// hashing password
// we will use this only when first time user is created or he/she updates his/her password
// we will use pre middleware to change password when save operation occurs (user.save())
userSchema.pre("save", function (next) {
  // this keyword is referring to userSchema itself
  let user = this;

  // checking if the user have modified the password
  // 12 is the salt value more its value more hashed password but it take more time so 12 is in medium range
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("Error is Hashing Password");

        // if there is an error it will immediately returns
        return next(err);
      }

      // if hashing was successful
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

// for login checking passwords
userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("Password is Incorrect");
      return next(err, false);
    }

    // if no error we get null
    console.log("Password match result", match);

    return next(null, match);
  });
};

export default mongoose.model("User", userSchema);
