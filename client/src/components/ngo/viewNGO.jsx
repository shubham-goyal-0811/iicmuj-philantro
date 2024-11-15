import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";

export default function ViewUserNGO() {
    const [ngo, setNgo] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8001/api/v1/ngo/getUserNgo", { withCredentials: true })
            .then(response => {
                setNgo(response.data);
            })
            .catch(error => {
                console.error("Error fetching NGO data:", error);
            });
    }, []);

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
            <div className="ngo-details">
                <h1>{ngo.name}</h1>
                <img src={ngo.logo} alt={`${ngo.name} logo`} />
                <p>{ngo.description}</p>
                <p>Address: {ngo.address}</p>
                <p>Contact: {ngo.contactNo}</p>
                <p>Email: {ngo.email}</p>
                <p>Category: {ngo.category}</p>
                <p>Raised: {ngo.raised ? ngo.raised : "No funds raised yet"}</p>
            </div>
        </>
    );
}
