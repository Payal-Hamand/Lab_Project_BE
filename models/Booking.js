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
  required: true,
  trim: true,
  minlength: 3,
  maxlength: 50
},
labOwner: {

  type:
    mongoose.Schema.Types.ObjectId,

  ref: 'User'

},

    age: {
  type: Number,
  required: true,
  min: 1,
  max: 99
},

    gender: {
      type: String,
      required: true
    },

    phone: {
  type: String,
  required: true,
  match: /^[6-9]\d{9}$/
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
    flatNo: {
  type: String,
  required: true
},

landmark: {
  type: String,
  
},

city: {
  type: String,
  required: true
},


pincode: {
  type: String,
  required: true,
  match: /^[1-9][0-9]{5}$/
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

  enum: [

    'Pending',

    'Assigned',

    'Sample Collected',

    'Processing',

    'Completed'

  ],

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

