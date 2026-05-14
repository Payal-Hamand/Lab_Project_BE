import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    testName: String,

    price: Number,

    bookingDate: String,

    slot: String,

    city: String,

    phone: String,
  },
  {
    timestamps: true,
  }
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking