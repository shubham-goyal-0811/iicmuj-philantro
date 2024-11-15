import React from "react";
import { useLocation } from 'react-router-dom';
import Header from '../header/Header';

export default function ViewMore() {
    const location = useLocation();
    const { ngo } = location.state || {};
    if (!ngo) {
        return <div>No NGO details available.</div>;
    }
    else {
        console.log(ngo);
    }

    return (
        <>
            <Header />
            <div className="flex w-full h-full">
                <div className="ngoaboutmain w-full h-screen flex flex-col justify-center items-center bg-[#d2c9c9]" >
                    <div className="view-more-page w-full h-auto flex justify-around items-center" >
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
                                    {ngo.raised && ngo.raised !== "" ? `Raised: ${ngo.raised}` : "Not raised any amount."}
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
