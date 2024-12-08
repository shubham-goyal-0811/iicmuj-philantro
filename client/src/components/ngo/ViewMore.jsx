import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import toast from "react-hot-toast";

export default function ViewMore() {
  const location = useLocation();
  const { ngo } = location.state || {};
  const [donating, setDonating] = useState(false);
  const [amount, setAmount] = useState("");
  const [ngoId, setNgoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketAmounts, setTicketAmounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (ngo) {
      setNgoId(ngo._id);
      fetchTicketAmounts(ngo.raise);
    } else {
      console.error("Ngo data is missing.");
    }
  }, [ngo]);

  const fetchTicketAmounts = async (ticketIds) => {
    const amounts = [];
    // console.log("fetching ticket amounts for ticketIds:", ticketIds);
    for (const ticketId of ticketIds) {
      try {
        const response = await fetch(`http://localhost:8001/api/v1/ticket/getTickets/${ticketId}`);
        const data = await response.json();
        if (data && data.data.amount) {
          amounts.push(data.data.amount);
        }
      } catch (error) {
        console.error("Error fetching ticket details:", error.message);
      }
    }
    setTicketAmounts(amounts);
  };

  const createOrder = async () => {
    const toastId = toast.loading('Creating order...');
    if (!ngoId || !amount) {
      alert("NGO ID and amount are required");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8001/api/v1/payment/create-order/${ngoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      const orderId = data.data.orderId;
      if (data) {
        const completePayment = await fetch(`http://localhost:8001/api/v1/payment/complete-payment`, {
          method: "POST",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const completePaymentOk = await completePayment.json();
        if (completePaymentOk) {
          toast.success("Payment completed successfully!", { id: toastId });
          navigate("/ngo");
        } else {
          toast.error(`Payment failed: ${completePaymentOk.message}`, { id: toastId });
        }
      } else {
        toast.error("Order was not placed", { id: toastId });
      }
    } catch (error) {
      toast.error("Order was not placed", { id: toastId });
      console.error("Error creating order:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDonating(false);
  };

  const handleDonate = () => {
    setDonating(true);
  };

  const handleCancelOrder = () => {
    setAmount("");
    setDonating(false);
  };

  //logic to download the NGO ID proof
  const downloadIdProof = async (idProofUrl) => {
    const toastId = toast.loading('Wait...');
    if (!idProofUrl) {
      toast.error("ID Proof document is not available.", { id: toastId });
      return;
    }
    toast.success("Downloading...", { id: toastId });

    try {
      const response = await fetch(idProofUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch the document.");
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${ngo.name}_IDProof.${blob.type.split("/")[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Failed to download the document.");
    }
  };
// console.log(ticketAmounts);
  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6 my-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex justify-center items-center md:w-1/3">
              <img
                src={ngo.logo}
                alt={`${ngo.name} logo`}
                className="w-40 h-40 object-cover rounded-full shadow-lg"
              />
            </div>
            <div className="md:w-2/3 p-4">
              <h1 className="text-4xl font-bold text-gray-800">{ngo.name}</h1>
              <p className="text-gray-600 mt-2">{ngo.description}</p>
              <div className="mt-4">
                <p className="text-lg">
                  <strong>Category:</strong> {ngo.category}
                </p>
                <p className="text-lg">
                  <strong>Address:</strong> {ngo.address}
                </p>
                <p className="text-lg">
                  <strong>Contact:</strong> {ngo.contactNo}
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> {ngo.email}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xl font-semibold text-gray-700">Raised Amounts:</p>
            {ticketAmounts.length > 0 ? (
              <ul className="list-disc pl-5">
                {ticketAmounts.map((amount, index) => (
                  <li key={index} className="text-lg text-blue-600">
                    ${amount}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-500">No raised amounts available.</p>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setDonating(true)}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300"
              >
                Donate
              </button>
              <button
                onClick={() => {
                  toast("Downloading ID Proof...");
                }}
                className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
              >
                Download ID Proof
              </button>
            </div>
          </div>
        </div>
        {donating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Donate to {ngo.name}</h2>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  onClick={createOrder}
                  className={`py-2 px-6 rounded-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-500"} transition duration-300`}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Donate"}
                </button>
                <button
                  onClick={() => setDonating(false)}
                  className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
