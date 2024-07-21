import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to generate an authentication token
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), userName: user.userName },
    process.env.JWT_SECRET, // Your JWT secret key
    { expiresIn: "1h" } // Token expiration time
  );
  return token;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
