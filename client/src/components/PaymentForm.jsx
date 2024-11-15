import React, { useState } from "react";

function PaymentForm({ onComplete }) {
  const [amount, setAmount] = useState("");
  const [ngoId, setNgoId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    try {
      console.log("aaya");
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/v1/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, ngoId }),
      });
      const data = await response.json();
      if (data.success) {
        setOrderId(data.data.order.id);
        alert("Order created successfully! Proceed to complete the payment.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  const completePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/v1/payment/complete-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      const data = await response.json();
      if (data.success) {
        onComplete(data.data.payment);
        alert("Payment completed successfully! Now verifying payment.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error completing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Donate to NGO</h2>
      <input
        type="text"
        placeholder="NGO ID"
        value={ngoId}
        onChange={(e) => setNgoId(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <button
        onClick={createOrder}
        className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        disabled={loading || !amount || !ngoId}
      >
        {loading ? "Creating Order..." : "Create Order"}
      </button>
      {orderId && (
        <button
          onClick={completePayment}
          className="bg-green-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Complete Payment"}
        </button>
      )}
    </div>
  );
}

export default PaymentForm;
