import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: true
    },

    patientName: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: true
    },

    gender: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },
    assignedLabAssistant: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  default: null
},

    address: {
      type: String,
      required: true
    },

    bookingDate: {
      type: String,
      required: true
    },

    bookingTime: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: 'Pending'
    },

    paymentStatus: {
      type: String,
      default: 'Pending'
    },

    report: {
      type: String,
      default: ''
    },
   reportId: {
  type: String,
  unique: true,
  sparse: true
},

verified: {
  type: Boolean,
  default: true
}

  },
  {
    timestamps: true
  }
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking

