import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";

export default function ViewUserNGO() {
    const [ngo, setNgo] = useState(null);
    const [newRaisedAmount, setNewRaisedAmount] = useState("");
    const [cause, setCause] = useState(""); // New state for cause
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/ngo/getUserNgo", { withCredentials: true })
            .then(response => {
                const fetchedNgo = response.data.data[0];
                setNgo(fetchedNgo);
                console.log(fetchedNgo);
            })
            .catch(error => {
                console.error("Error fetching NGO data:", error);
            });
    }, []);

    const handleRaiseSubmit = () => {
        if (!ngo || !ngo._id) {
            alert("Invalid NGO data or missing ID");
            return;
        }
        if (isNaN(newRaisedAmount) || newRaisedAmount <= 0) {
            alert("Please enter a valid number for the raised amount.");
            return;
        }
        if (!cause) {
            alert("Please provide a cause for the raise.");
            return;
        }
    
        setIsLoading(true);
        const ticketData = {
            amount: parseFloat(newRaisedAmount),
            cause: cause
        };
        axios.post(
            `http://localhost:8001/api/v1/ticket/${ngo._id}/post`, 
            ticketData,
            { withCredentials: true }
        )
        .then(response => {
            const newTicketId = response.data.data._id;
            const updatedNgo = {
                ...ngo,
                raise: [...ngo.raise, newTicketId]
            };
    
            setNgo(updatedNgo);
            setNewRaisedAmount("");
            setCause("");
            setIsLoading(false);
            alert("Raised amount updated successfully!");
        })
        .catch(error => {
            console.error("Error creating ticket or updating NGO raise:", error);
            setIsLoading(false);
        });
    };
              

    if (!ngo) {
        return (
            <div>
                <Header />
                <div>Loading your NGO information...</div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="flex w-full h-full">
                <div className="ngoaboutmain w-full h-screen flex flex-col justify-center items-center bg-[#d2c9c9]" >
                    <div className="view-more-page w-full h-auto flex justify-around items-center">
                        <div className="imgandname flex flex-col justify-evenly items-center w-3/12 h-3/6 bg-[#f2f0ef] rounded-3xl shadow-2xl hover:scale-105 duration-300" style={{ padding: "1%", margin: "0.5%" }}>
                            <div className="img flex justify-center w-6/12" style={{ padding: "1%", margin: "0.5%" }}>
                                <img src={ngo.logo} alt={`${ngo.name} logo`} className="rounded-full shadow-2xl" />
                            </div>
                            <div className="name" style={{ padding: "1%", margin: "0.5%" }}>
                                <h1 className="text-6xl font-bold">{ngo.name}</h1>
                            </div>
                            <div className="createdby flex flex-col justify-center items-center border-2 border-blue-900 border-dotted" style={{ padding: "1%", margin: "0.5%" }}>
                                <h1 className="text-2xl">Founded By:-</h1>
                                <h1 className="text-2xl font-bold">{ngo.createdBy.fullName}</h1>
                            </div>
                        </div>
                        <div className="descandcat border-2 w-6/12 flex flex-col bg-[#f2f0ef] rounded-3xl shadow-2xl hover:scale-105 duration-300" style={{ padding: "1%", margin: "0.5%" }}>
                            <div className="aboutngo">
                                <div className="desc1">
                                    <h1 className="text-4xl font-bold">About {ngo.name} :-</h1>
                                    <p>{ngo.description}</p>
                                </div>
                                <div className="address" style={{ padding: "1%", margin: "0.5%" }}>
                                    <h1 className="text-2xl font-bold">Address:-</h1>
                                    <h1>{ngo.address}</h1>
                                </div>
                                <div className="contactno" style={{ padding: "1%", margin: "0.5%" }}>
                                    <h1 className="text-2xl font-bold">Contact {ngo.name}:-</h1>
                                    <h1>{ngo.contactNo}</h1>
                                </div>
                                <div className="emailngo" style={{ padding: "1%", margin: "0.5%" }}>
                                    <h1 className="text-2xl font-bold">Email {ngo.name}:-</h1>
                                    <h1>{ngo.email}</h1>
                                </div>
                            </div>
                            <div className="raised-amount">
                                <h1 className="text-4xl font-bold">Raised by {ngo.name} :-</h1>
                                <h2 className="text-xl">
                                    {ngo.raised && ngo.raised !== "" ? 
                                        `Raised: $${ngo.raised}` : 
                                        <>
                                            <p>Not raised any amount yet.</p>
                                            <input
                                                type="number"
                                                value={newRaisedAmount}
                                                onChange={(e) => setNewRaisedAmount(e.target.value)}
                                                placeholder="Enter amount to raise"
                                                className="p-2 border rounded mt-2"
                                            />
                                            <textarea
                                                value={cause}
                                                onChange={(e) => setCause(e.target.value)}
                                                placeholder="Explain why you need to raise funds"
                                                className="p-2 border rounded mt-2"
                                            />
                                            <button 
                                                onClick={handleRaiseSubmit}
                                                disabled={isLoading}
                                                className="mt-2 p-2 bg-blue-500 text-white rounded"
                                            >
                                                {isLoading ? "Submitting..." : "Submit New Amount"}
                                            </button>
                                        </>
                                    }
                                </h2>
                            </div>
                            <div className="cat flex flex-col justify-center items-center">
                                <p className="text-2xl font-bold">Category:</p>
                                <p>{ngo.category}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
