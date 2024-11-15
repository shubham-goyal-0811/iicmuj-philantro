import React, { useState } from 'react';
import Search from '../../img/search.png';

export default function Options() {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchClick = () => {
        if(showSearchBar){
            setShowSearchBar(false);
        }
        else{
            setShowSearchBar(true);
        }
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
                                <a href="/ngo" className="block text-gray-600 rounded">
                                    NGO
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
