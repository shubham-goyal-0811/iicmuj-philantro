import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../img/search.png';
import axios from 'axios';

export default function Options() {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isNGO, setIsNgo] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8001/api/v1/users/profile', { withCredentials: true })
            .then(response => {
                const user = response.data;
                if (user && user.data && user.data.role === 'NGO') {
                    setIsNgo(true);
                } else {
                    setIsNgo(false);
                }
            })
            .catch(err => {
                console.error("Error fetching user data:", err);
                setIsNgo(false);
            })
    }, []);
    const handleSearchClick = () => {
        if (showSearchBar) {
            setShowSearchBar(false);
        }
        else {
            setShowSearchBar(true);
        }
    };
    const navigate = useNavigate();
    const handleViewNGO = () => {
        navigate('/userviewngo');
    };

    return (
        <>
            <div className="options flex items-center">
                <ul className="flex font-medium justify-between items-center h-full w-full">
                    {!showSearchBar && (
                        <>
                            <li>
                                <a href="/" className="block text-gray-600 rounded">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a onClick={handleViewNGO} className="block text-gray-600 rounded">
                                    {!isNGO && 'NGO'}
                                </a>
                            </li>
                            <li>
                                <a onClick={handleViewNGO} className="block text-gray-600 rounded">
                                    {isNGO && 'View ngo'}
                                </a>
                            </li>
                        </>
                    )}
                    <li className="w-2/12">
                        <div className="search flex justify-center w-full">
                            <img
                                src={Search}
                                alt="Search"
                                className="w-6/12 cursor-pointer"
                                onClick={handleSearchClick}
                            />
                        </div>
                    </li>
                    {showSearchBar && (
                        <li className="w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search NGOs by name or category..."
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}
