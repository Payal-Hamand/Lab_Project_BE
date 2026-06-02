import axios from "axios";
import sha256 from "sha256";
import uniqid from "uniqid";
import Booking from "../models/Booking.js";

export const createPayment =
  async (req, res) => {

    try {

      const {
        bookingId,
        patientName,
        amount,
        mobileNumber,
      } = req.body;

      

      const merchantTransactionId =
        "T" + Date.now();

        await Booking.findByIdAndUpdate(

  bookingId,

  {
    transactionId:
      merchantTransactionId,
  }
);

      const data = {

        merchantId:
          process.env.MERCHANT_ID,

        merchantTransactionId,

        merchantUserId:
          bookingId,

        amount:
          Number(amount) * 100,

        redirectUrl:
        //   `http://localhost:5000/api/payment/status/${merchantTransactionId}`,

            `${process.env.BACK_END_URL}/api/payment/status/${merchantTransactionId}`,

        redirectMode: "REDIRECT",

        callbackUrl:
        //   `http://localhost:5000/api/payment/status/${merchantTransactionId}`,
            `${process.env.BACK_END_URL}/api/payment/status/${merchantTransactionId}`,

        mobileNumber:
          mobileNumber ||
          "9999999999",

        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };

      const payload =
        JSON.stringify(data);

      const payloadMain =
        Buffer.from(payload)
          .toString("base64");

      const key =
        payloadMain +
        "/pg/v1/pay" +
        process.env.SALT_KEY;

        console.log(
        "Payload:",
        process.env.SALT_KEY,
      );

      const xVerify =
        sha256(key) +
        "###" +
        process.env.SALT_INDEX;
       

      const response =
        await axios.post(

          `${process.env.BASE_URL}/pg/v1/pay`,

          {
            request: payloadMain,
          },

          {
            headers: {

              accept:
                "application/json",

              "Content-Type":
                "application/json",

              "X-VERIFY":
                xVerify,
            },
          }
        );

      console.log(
        response.data
      );

      const phonepeUrl =
        response.data.data
          .instrumentResponse
          .redirectInfo.url;

      return res.status(200)
        .json({

          success: true,

          url: phonepeUrl,
        });

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );

      return res.status(500)
        .json({

          success: false,

          error:
            error.response?.data,
        });
    }
  };

export const checkPaymentStatus =
  async (req, res) => {

    try {

      const {
        txnId,
      } = req.params;

      const string =
        `/pg/v1/status/${process.env.MERCHANT_ID}/${txnId}` +
        process.env.SALT_KEY;

      const xVerify =
        sha256(string) +
        "###" +
        process.env.SALT_INDEX;

      const response =
        await axios.get(

          `${process.env.BASE_URL}/pg/v1/status/${process.env.MERCHANT_ID}/${txnId}`,

          {
            headers: {

              accept:
                "application/json",

              "Content-Type":
                "application/json",

              "X-MERCHANT-ID":
                process.env.MERCHANT_ID,

              "X-VERIFY":
                xVerify,
            },
          }
        );

      console.log('ajja',
        response.data
      );

    if (
  response.data.success &&
  response.data.code ===
    "PAYMENT_SUCCESS"
) {

  const transactionId =
    response.data.data
      .merchantTransactionId;

  console.log(
    "Transaction ID:",
    transactionId
  );

  const booking =
    await Booking.findOne({

      transactionId:
        transactionId,
    });

  console.log(
    "Booking:",
    booking
  );

  if (booking) {

    await Booking.findByIdAndUpdate(

      booking._id,

      {
        paymentStatus:
          "Paid",
          paidAt:
  new Date(),
      }
    );
  }

  return res.redirect(
    `${process.env.FRONT_END_URL}/lab-assistant`
  );
}

      return res.redirect(
        `${process.env.FRONT_END_URL}/lab-assistant`
      );

    } catch (error) {

      console.log(error);

      return res.redirect(
         `${process.env.FRONT_END_URL}/lab-assistant`
      );
    }
  };