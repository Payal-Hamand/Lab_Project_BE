import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Same subcategory name should not repeat
// inside the same category.
subcategorySchema.index(
  {
    category: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

const Subcategory = mongoose.model(
  "Subcategory",
  subcategorySchema
);

export default Subcategory;