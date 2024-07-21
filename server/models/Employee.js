import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    courses: {
      type: [String],
      required: true,
      enum: ["MCA", "BCA", "BSC"],
    },
    image: {
      url: {
        type: String,
        required: false,
      },
      public_id: {
        type: String,
        required: false,
      },
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
