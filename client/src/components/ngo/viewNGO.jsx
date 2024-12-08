import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";

export default function ViewUserNGO() {
    const [ngo, setNgo] = useState(null);
    const [newRaisedAmount, setNewRaisedAmount] = useState("");
    const [tickets, setTickets] = useState([]);
    const [cause, setCause] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8001/api/v1/ngo/getUserNgo", { withCredentials: true })
            .then((response) => {
                const fetchedNgo = response.data.data[0];
                setNgo(fetchedNgo);

                if (fetchedNgo && fetchedNgo._id) {
                    axios
                        .get(`http://localhost:8001/api/v1/ticket/${fetchedNgo._id}/getTickets`, {
                            withCredentials: true,
                        })
                        .then((ticketResponse) => {
                            setTickets(ticketResponse.data.data);
                        })
                        .catch((error) => {
                            console.error("Error fetching tickets:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching NGO data:", error);
            });
    }, []);

    const handleRaiseSubmit = () => {
        if (!ngo || !ngo._id) {
            alert("Invalid NGO data or missing ID");
            return;
        }
        if (isNaN(newRaisedAmount) || Number(newRaisedAmount) <= 0) {
            alert("Please enter a valid number for the raised amount.");
            return;
        }
        if (!cause.trim()) {
            alert("Please provide a cause for the raise.");
            return;
        }
    
        setIsLoading(true);
    
        // Ensure amount is sent as a number
        const ticketData = { 
            amount: Number(newRaisedAmount), 
            cause 
        };
    
        console.log("Ticket Data Sent:", ticketData); // Debugging step
    
        axios
            .post(`http://localhost:8001/api/v1/ticket/${ngo._id}/post`, ticketData, {
                withCredentials: true,
            })
            .then((response) => {
                console.log("Response Data:", response.data); // Debugging step
                const newTicket = response.data.data;
                setTickets([...tickets, newTicket]);
                setNewRaisedAmount("");
                setCause("");
                setIsModalOpen(false);
                setIsLoading(false);
                alert("Raised amount updated successfully!");
            })
            .catch((error) => {
                console.error("Error creating ticket:", error);
                setIsLoading(false);
            });
    };
    

    if (!ngo) {
        return (
            <div>
                <Header />
                <div className="flex items-center justify-center h-screen">
                    <p>Loading NGO information...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="p-8 bg-gray-100 min-h-screen">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="flex items-center space-x-6">
                        <img
                            src={ngo.logo}
                            alt={`${ngo.name} Logo`}
                            className="w-60 h-48 rounded-full shadow-md"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">{ngo.name}</h1>
                            <p className="text-gray-600">Founded by: {ngo.createdBy.fullName}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">About Us</h2>
                        <p className="text-gray-700">{ngo.description}</p>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Contact Information</h3>
                            <p>Address: {ngo.address}</p>
                            <p>Phone: {ngo.contactNo}</p>
                            <p>Email: {ngo.email}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Funds Raised</h2>
                        {tickets.length > 0 ? (
                            <table className="w-full border border-gray-300">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="p-2 text-left">Amount</th>
                                        <th className="p-2 text-left">Cause</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, index) => (
                                        <tr key={index} className="border-t border-gray-300">
                                            <td className="p-2">${ticket.amount}</td>
                                            <td className="p-2">{ticket.cause}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600">No funds raised yet.</p>
                        )}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Raise Money
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Raise Funds</h2>
                        <input
                            type="number"
                            value={newRaisedAmount}
                            onChange={(e) => setNewRaisedAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full p-2 border rounded mb-4"
                        />
                        <textarea
                            value={cause}
                            onChange={(e) => setCause(e.target.value)}
                            placeholder="Describe the cause"
                            className="w-full p-2 border rounded mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRaiseSubmit}
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
