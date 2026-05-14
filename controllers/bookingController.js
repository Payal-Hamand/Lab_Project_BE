import Booking from '../models/Booking.js'
import dotenv from 'dotenv'

dotenv.config()

export const createBooking = async (req, res) => {

  try {

    const {
      test,
      patientName,
      age,
      gender,
      phone,
      address,
      bookingDate,
      bookingTime
    } = req.body


    const booking = await Booking.create({

  user: req.user._id,

  test,

  patientName,

  age,

  gender,

  phone,

  address,

  bookingDate,

  bookingTime,

  reportId:
    'REP-' +
    Math.floor(
      100000 + Math.random() * 900000
    )

})

    res.status(201).json(booking)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

export const getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      user: req.user._id
    })
      .populate('test')
      .sort({ createdAt: -1 })

    res.status(200).json(bookings)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

export const uploadReport = async (
  req,
  res
) => {

  try {
    console.log('UPLOAD REPORT CALLED')

    const booking =
      await Booking.findById(
        req.params.id
      )

    if (!booking) {

      return res.status(404).json({
        message: 'Booking Not Found'
      })
    }

    // File validation

    if (!req.file) {

      return res.status(400).json({
        message: 'No File Uploaded'
      })
    }

    booking.report = req.file.path

    booking.status = 'Completed'

    booking.assignedLabAssistant =
      req.user._id

    await booking.save()

    res.status(200).json({

      message:
        'Report Uploaded Successfully',

      reportUrl: booking.report

    })

  } catch (error) {

    console.log(
  'UPLOAD ERROR:',
  error
)

    res.status(500).json({
      message: error.message
    })
  }
}
export const getAllBookings = async (
  req,
  res
) => {

  try {

    const bookings = await Booking.find()

      .populate('test')

      .populate('user')
      .populate(
    'assignedLabAssistant',
    'name email'
  )

      .sort({ createdAt: -1 })

    res.status(200).json(bookings)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}