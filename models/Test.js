import mongoose from 'mongoose'

const testSchema = mongoose.Schema(
  {
    title: String,

    tests: String,

    price: Number,

    description: String,
  },
  {
    timestamps: true,
  }
)

const Test = mongoose.model('Test', testSchema)

export default Test