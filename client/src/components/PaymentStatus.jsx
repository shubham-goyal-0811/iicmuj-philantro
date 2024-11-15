import React from "react";

function PaymentStatus({ payment }) {
  const verifyPayment = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/payment/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: payment.orderId,
          paymentId: payment.id,
          signature: payment.signature,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Payment verified successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded mt-4">
      <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
      <p><strong>Order ID:</strong> {payment.orderId}</p>
      <p><strong>Payment ID:</strong> {payment.id}</p>
      <button
        onClick={verifyPayment}
        className="bg-purple-500 text-white py-2 px-4 rounded mt-4"
      >
        Verify Payment
      </button>
    </div>
  );
}

export default PaymentStatus;
