import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";

export default function ViewUserNGO() {
    const [ngos, setNgos] = useState([]);
    const [selectedNgo, setSelectedNgo] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newRaisedAmount, setNewRaisedAmount] = useState("");
    const [cause, setCause] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [ownerDetails, setOwnerDetails] = useState(null);

    //fetch NGOs and Tickets
    useEffect(() => {
        const fetchNgoData = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/v1/ngo/getUserNgo", {
                    withCredentials: true,
                });
                const fetchedNgoArray = response.data.data;
                if (Array.isArray(fetchedNgoArray) && fetchedNgoArray.length > 0) {
                    setNgos(fetchedNgoArray);
                }
                else {
                    setError("No NGOs found for the current user.");
                }

                const response1 = await fetch('http://localhost:8001/api/v1/users/profile', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                const data = await response1.json();
                if (data.success) {
                    setOwnerDetails(data.data);
                }
                else {
                    console.error('Failed to fetch profile:', data.message);
                }
            }
            catch (err) {
                console.error("Error fetching NGO data:", err);
                setError("Failed to fetch NGO data. Please try again later.");
            }
        };

        fetchNgoData();
    }, []);

    //fetch Tickets for a Selected NGO
    const handleSelectNgo = async (ngo) => {
        setSelectedNgo(ngo);
        try {
            const ticketResponse = await axios.get(
                `http://localhost:8001/api/v1/ticket/${ngo._id}/getTickets`,
                { withCredentials: true }
            );
            setTickets(ticketResponse.data.data);
        }
        catch (err) {
            console.error("Error fetching tickets:", err);
            setError("Failed to fetch tickets for the selected NGO.");
        }
    };

    //handle Fundraising Submission
    const handleRaiseSubmit = async () => {
        if (!selectedNgo || !selectedNgo._id) {
            alert("Invalid NGO data or missing ID.");
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

        try {
            const response = await axios.post(
                `http://localhost:8001/api/v1/ticket/${selectedNgo._id}/post`,
                { amount: Number(newRaisedAmount), cause },
                { withCredentials: true }
            );
            setTickets((prev) => [...prev, response.data.data]);
            setNewRaisedAmount("");
            setCause("");
            setIsModalOpen(false);
            alert("Raised amount updated successfully!");
        }
        catch (err) {
            console.error("Error creating ticket:", err);
            alert("Failed to submit the raised amount. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };

    if (error) {
        return (
            <div>
                <Header />
                <div className="flex items-center justify-center h-screen">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }
    const gridColsClass = ngos.length > 2 ? `grid-cols-2 grid-row-${ngos.length}` : "grid-cols-2";
    return (
        <>
            <Header />
            <div className="p-8 bg-gray-100 min-h-screen">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-6 w-full flex justify-center">{ownerDetails ? `${ownerDetails.fullName}'s NGOs` : "Loading user details..."}</h1>
                    <div className={`grid ${gridColsClass} gap-6`}>
                        {ngos.map((ngo) => (
                            <div key={ngo._id} className={`p-4 border rounded shadow hover:shadow-lg cursor-pointer transition-transform duration-300 ${selectedNgo && selectedNgo._id === ngo._id ? "bg-blue-100 border-blue-500 scale-105" : "bg-white" }`} onClick={() => handleSelectNgo(ngo)} >
                                <h2 className="text-2xl font-semibold">{ngo.name}</h2>
                            </div>
                        ))}
                    </div>
                    {selectedNgo && (
                        <div key={selectedNgo._id} className="mt-8 transition-opacity duration-500 ease-in-out" >
                            <div className="animate-fade-in">
                                <img src={selectedNgo.logo} alt="" className="w-60 h-40 rounded-full transition-transform duration-300 hover:scale-105" />
                                <h2 className="text-2xl font-bold mb-4">Selected NGO: {selectedNgo.name}</h2>
                                <p className="text-gray-700 text-xl">{selectedNgo.description}</p>
                                <p className="text-xl">Mail:- {selectedNgo.email}</p>
                                <p className="text-xl">Contact No.:- {selectedNgo.contactNo}</p>
                                <h3 className="text-lg font-semibold mt-4">Funds Raised</h3>
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
                                <button onClick={() => setIsModalOpen(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" >
                                    Raise Money
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Raise Funds</h2>
                        <input type="number" value={newRaisedAmount} onChange={(e) => setNewRaisedAmount(e.target.value)} placeholder="Enter amount" className="w-full p-2 border rounded mb-4" />
                        <textarea value={cause} onChange={(e) => setCause(e.target.value)} placeholder="Describe the cause" className="w-full p-2 border rounded mb-4" />
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" >
                                Cancel
                            </button>
                            <button onClick={handleRaiseSubmit} disabled={isLoading} className={`px-4 py-2 rounded ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"}`} >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
