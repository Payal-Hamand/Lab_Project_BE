import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    testsIncluded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Health Package",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model(
  "Package",
  packageSchema
);

export default Package;