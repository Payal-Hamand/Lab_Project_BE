import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: [
        'admin',
        'patient',
        'lab_assistant',
        'lab_owner',
        
      ],
      default: 'patient'
    },
    labOwner: {

  type:
    mongoose.Schema.Types.ObjectId,

  ref: 'User',

  default: null

},
phone: {
  type: String
},

document: {
  type: String
},
servicePincodes: {

  type: [String],

  default: []

},
  },
  
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

export default User