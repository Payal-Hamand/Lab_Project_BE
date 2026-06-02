import Booking from "../models/Booking.js";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const createBooking = async (req, res) => {
  try {
    const {
      test,
      patientName,
      age,
      gender,
      phone,
      flatNo,
      landmark,
      city,
      pincode,
      address,
      bookingDate,
      bookingTime,
    } = req.body;
    // Empty Validation
    if (
      !test ||
      !patientName ||
      !age ||
      !gender ||
      !phone ||
      !flatNo ||
      !city ||
      !pincode ||
      !address ||
      !bookingDate ||
      !bookingTime
    ) {
      return res.status(400).json({
        message: "All Fields Are Required",
      });
    }
    // Name Validation
    if (patientName.length < 3) {
      return res.status(400).json({
        message: "Patient Name Must Be At Least 3 Characters",
      });
    }
    // Age Validation
    if (age < 1 || age > 99) {
      return res.status(400).json({
        message: "Age Must Be Between 1 and 99",
      });
    }
    // Phone Validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Enter Valid 10 Digit Phone Number",
      });
    }

    // Pincode Validation

    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(pincode)) {
      return res.status(400).json({
        message: "Enter Valid 6 Digit Pincode",
      });
    }
    // Date Validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(bookingDate);
    if (selectedDate < today) {
      return res.status(400).json({
        message: "Booking Date Cannot Be In Past",
      });
    }

    // Gender Validation

    const validGenders = ["Male", "Female", "Other"];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({
        message: "Invalid Gender Selected",
      });
    }
    const labOwner = await User.findOne({
      role: "lab_owner",
      servicePincodes: pincode,
    });
    if (!labOwner) {
      return res.status(404).json({
        message: "No Lab Available In This Area",
      });
    }
    // Create Booking
    const booking = await Booking.create({
      user: req.user._id,
      test,
      patientName,
      age,
      gender,
      phone,
      flatNo,
      landmark,
      city,
      pincode,
      address,
      bookingDate,
      bookingTime,
      labOwner: labOwner._id,
      reportId: "REP-" + Math.floor(100000 + Math.random() * 900000),
    });

    res.status(201).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("test")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadReport = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "No File Uploaded",
      });
    }
    // Save Cloudinary URL
    booking.report = req.file.path;
    booking.status = "Completed";
    booking.assignedLabAssistant = req.user._id;
    await booking.save();
    res.status(200).json({
      message: "Report Uploaded Successfully",
      reportUrl: booking.report,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("test")
      .populate("user")
      .populate("assignedLabAssistant", "name email")
      .populate("labOwner", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getLabOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      labOwner: req.user._id,
    })
      .populate("test")
      .populate("user")
      .populate("assignedLabAssistant", "name email")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const assignAssistant = async (req, res) => {
  try {
    const {
      bookingId,
      assistantId,
    } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }
    // Booking Ownership
    if (booking.labOwner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    // Assistant Check
    const assistant = await User.findById(assistantId);
    if (!assistant || assistant.role !== "lab_assistant") {
      return res.status(400).json({
        message: "Invalid Assistant",
      });
    }
    // Assistant Belongs To Lab Owner
    if (assistant.labOwner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Assistant Does Not Belong To Your Lab",
      });
    }
    booking.assignedLabAssistant = assistantId;
    booking.status = "Assigned";
    await booking.save();
    res.status(200).json({
      message: "Assistant Assigned Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAssignedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      assignedLabAssistant: req.user._id,
    })
      .populate(
  "test",
  "title price"
)
      .populate("user")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const markReached = async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      )

    if (!booking) {

      return res.status(404).json({
        message: 'Booking Not Found'
      })
    }

    booking.status = 'Reached'

    booking.reachedAt = new Date()

    await booking.save()

    res.status(200).json({
      message: 'Assistant Reached Patient Home'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}


export const uploadSample = async (req, res) => {

  try {

    const booking =
      await Booking.findById(
        req.params.id
      )

    if (!booking) {

      return res.status(404).json({
        message: 'Booking Not Found'
      })
    }

  booking.sampleImages =
  req.files.map(
    file => file.path
  )

    booking.sampleId =
      'SMP-' +
      Math.floor(
        100000 +
        Math.random() * 900000
      )

    booking.sampleCollectedAt =
      new Date()

    booking.assistantNotes =
      req.body.assistantNotes

    booking.status =
      'Sample Collected'

    await booking.save()

    res.status(200).json({
      message:
        'Sample Uploaded Successfully',

      booking
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })
  }
}

export const markPaymentDone =
  async (req, res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        )

      if (!booking) {

        return res.status(404).json({
          message:
            'Booking Not Found'
        })
      }

      booking.paymentStatus =
        'Paid'

      booking.status = 'Paid'

      booking.transactionId =
        req.body.transactionId

      booking.paymentAmount =
        req.body.paymentAmount

      booking.paidAt =
        new Date()

      await booking.save()

      res.status(200).json({
        message:
          'Payment Completed'
      })

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }
