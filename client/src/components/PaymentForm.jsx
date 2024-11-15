// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function PaymentForm({ onComplete }) {
//   const [amount, setAmount] = useState("");
//   const [ngoId, setNgoId] = useState("");
//   const [orderId, setOrderId] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (ngo) {
//       setNgoId(ngo.id);
//     }
//   }, [ngo]);

//   const createOrder = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost:8001/api/v1/payment/create-order/${ngoId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         setOrderId(data.data.order.id);
//         alert("Order created successfully! Proceed to complete the payment.");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error creating order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const completePayment = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:8001/api/v1/payment/complete-payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ orderId }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         onComplete(data.data.payment);
//         alert("Payment completed successfully! Now verifying payment.");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Error completing payment:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     window.history.back();
//   };

//   return (
    
//   );
// }

// export default PaymentForm;
