const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

exports.verifyFlutterwavePayment = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { transaction_id, userId, amount } = req.body;
  const secret_key = "FLWSECK_TEST-5c15f706170785c0b8eaaeedd8542b85-X"; // Replace with your **Flutterwave Secret Key**

  try {
    const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
      headers: {
        Authorization: `Bearer ${secret_key}`,
      },
    });

    const data = response.data;
    if (data.status === "success" && data.data.status === "successful" && data.data.amount >= amount) {
      // Store the investment in Firestore
      await admin.firestore().collection("investments").add({
        userId,
        transactionId: transaction_id,
        amount: data.data.amount,
        currency: data.data.currency,
        date: new Date().toISOString(),
      });

      return res.status(200).send({ success: true, message: "Payment verified and stored." });
    } else {
      return res.status(400).send({ success: false, message: "Payment verification failed." });
    }
  } catch (error) {
    console.error("Flutterwave verification error:", error.message);
    return res.status(500).send({ success: false, message: "Internal Server Error." });
  }
});
