import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

export default function ViewMore() {
    const location = useLocation();
    const { ngo } = location.state || {};
    const [donating, setDonating] = useState(false);
    const [copyStatus, setCopyStatus] = useState(false);
    const [amount, setAmount] = useState("");
    const [ngoId, setNgoId] = useState("");
    const [orderId, setOrderId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (ngo) {
            setNgoId(ngo._id);
        }
    }, [ngo]);

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
                body: JSON.stringify({ amount, ngoId }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success("Thank you for your payment", { id: toastId });
                setOrderId(data.data.order.id);
                navigate("/ngo");
            } else {
                toast.error("Order was not placed", { id: toastId });
            }
        } catch (error) {
            console.error("Error creating order:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setDonating(false);
    };

    const handleDonate = () => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
        setDonating(true);
    };

    const onCopyText = () => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
    };

    if (!ngo) {
        return <div>No NGO details available.</div>;
    }

    const handleCancelOrder = () => {
        setAmount("");
        setOrderId("");
        setDonating(false);
    };
    //logic to download the ngo id proof
    const downloadIdProof = async (idProofUrl) => {
        const toastId = toast.loading('Wait...');
        if (!idProofUrl) {
            toast.error("ID Proof document is not available.", { id: toastId });
            return;
        }
        toast.success("Downloding...", { id: toastId });
    
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

    return (
        <>
            <Header />
            <div className="flex w-full h-full">
                <div className="ngoaboutmain w-full h-screen flex flex-col justify-center items-center bg-[#d2c9c9]" >
                    <div className="view-more-page w-full h-auto flex justify-around items-center" >
                        <div className="imgandname flex flex-col justify-evenly items-center w-3/12 h-auto bg-[#f2f0ef] rounded-3xl shadow-2xl duration-300" style={{ padding: "1%", margin: "0.5%" }}>
                            <div className="img flex justify-center w-6/12" style={{ padding: "1%", margin: "0.5%" }}>
                                <img src={ngo.logo} alt={`${ngo.name} logo`} className="rounded-full shadow-2xl" />
                            </div>
                            <div className="name" style={{ padding: "1%", margin: "0.5%" }}>
                                <h1 className="text-6xl font-bold">{ngo.name}</h1>
                            </div>
                            <div className="createdby flex flex-col justify-center items-center border-2 border-blue-900 border-dotted" style={{ padding: "1%", margin: "0.5%" }}>
                                <h1 className="text-2xl">Founded By:-</h1>
                                <h1 className="text-2xl font-bold">{ngo.createdBy?.fullName || "Unknown"}</h1>
                            </div>
                        </div>
                        <div className="descandcat border-2 w-6/12 flex flex-col bg-[#f2f0ef] rounded-3xl shadow-2xl" style={{ padding: "1%", margin: "0.5%" }}>
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
                            <div className="raised-amount" style={{ padding: "1%", margin: "0.5%", overflow: "hidden" }}>
                                <h1 className="text-4xl font-bold">Raised by {ngo.name} :-</h1>
                                <h2 className="text-xl break-words">
                                    {ngo.raise && ngo.raise.length > 0 ? `Raised: ${ngo.raise}` : "Not raised any amount."}
                                </h2>
                            </div>
                            <div className="cat flex flex-col justify-center items-center">
                                <p className="text-2xl font-bold">Category:</p>
                                <p>{ngo.category}</p>
                                <div className="flex w-full justify-around">
                                    <CopyToClipboard text={ngo._id} onCopy={onCopyText}>
                                        <button onClick={handleDonate} className="bg-[#00938a] text-xl p-3 rounded-lg hover:bg-[#5ec273] duration-200" >
                                            Donate
                                        </button>
                                    </CopyToClipboard>
                                    <button
                                        onClick={() => downloadIdProof(ngo.idProof)}
                                        className="bg-[#00938a] text-xl p-3 rounded-lg hover:bg-[#5ec273] duration-200">
                                        Download Unique Darpan ID
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`payment-container ${donating ? 'show' : ''}`}>
                    <div className="payment-form flex flex-col">
                        <h2>Donate to NGO</h2>
                        {ngo && (
                            <div>
                                <p className="text-xl"><strong>NGO Name:</strong> {ngo.name}</p>
                                <p className="text-xl"><strong>Category:</strong> {ngo.category}</p>
                                <p className="text-xl"><strong>Address:</strong> {ngo.address}</p>
                            </div>
                        )}
                        <input type="number" className="m-2" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <div className="flex w-full justify-between">
                            <button onClick={createOrder} className="bg-blue" disabled={loading || !amount || !ngoId}>
                                {loading ? "Creating Order..." : "Create Order"}
                            </button>
                            <button onClick={handleCancelOrder} className="bg-red mt-3">
                                Cancel Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
