// import mongoose from "mongoose";

// const packageSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//       unique: true,
//       minlength: 2,
//     },

//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     price: {
//       type: Number,
//       required: true,
//       min: 1,
//     },

//     category: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Category"
// },
//     testsIncluded: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Test",
//       },
//     ],

//     image: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Package = mongoose.model(
//   "Package",
//   packageSchema
// );

// export default Package;


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

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    testsIncluded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true,
      },
    ],

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
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

const Package = mongoose.model(
  "Package",
  packageSchema
);

export default Package;