import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Part1({ searchQuery }) {
    const ngoTypesArray = [
        "All NGOS",
        "Charitable Organizations",
        "Advocacy NGOs",
        "Social Welfare Organizations",
        "Environmental NGOs",
        "Educational NGOs",
        "Healthcare NGOs",
        "Cultural NGOs",
        "Microfinance NGOs",
        "Religious NGOs",
        "Research and Policy NGOs",
        "Disaster Relief NGOs",
        "Rural Development NGOs",
        "Youth and Sports NGOs",
        "Women Empowerment NGOs"
    ];

    const [ngosArray, setNgosArray] = useState([]);
    const [filteredNgos, setFilteredNgos] = useState([]);
    const [selectedType, setSelectedType] = useState("All NGOS");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const ngoRefs = useRef([]);
    const typeRefs = useRef([]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNgos();
    }, []);

    useEffect(() => {
        if(filteredNgos.length > 0 && !hasAnimated){
            gsap.fromTo(
                ngoRefs.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.4, duration: 1.5 }
            );
        }
    }, [filteredNgos]);

    //fetching data and storing it in ngosArray and filteredNgos.
    const fetchNgos = async () => {
        try{
            const response = await fetch('http://localhost:8001/api/v1/ngo/getNgos');
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched NGOs:', data);
            if(data.success && Array.isArray(data.data)){
                setNgosArray(data.data);
                setFilteredNgos(data.data);
            } 
            else{
                console.error('Fetched data is not an array:', data);
            }
        } 
        catch(error){
            console.error('Error fetching NGOs:', error);
        }
    };

    //filtering NGOs based on the selected category.
    const handleTypeClick = (type) => {
        setSelectedType(type);

        if(type === "All NGOS"){
            setFilteredNgos(ngosArray);
        } 
        else{
            const filtered = ngosArray.filter((ngo) => {
                const ngoCategory = ngo.category ? ngo.category.toLowerCase() : "";
                const selectedCategory = type.toLowerCase();
                return ngoCategory.includes(selectedCategory) || selectedCategory.includes(ngoCategory);
            });
            setFilteredNgos(filtered);
        }
        setIsSidebarOpen(false);
    };

    const handleViewMore = (ngo) => {
        navigate(`/view-more/${ngo._id}`, { state: { ngo } });
    };

    //function to toggle the sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="parentmain1 h-max w-full bg-white relative">
                <div className="childmain1 h-auto overflow-hidden">
                    <div className="w-full flex justify-center">
                        <h1 className="lg:text-7xl md:text-5xl sm:text-3xl font-bold italic">NGO's</h1>
                    </div>
                    <div className="w-full flex justify-center mt-6">
                        <button  onClick={toggleSidebar}  className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full"> {isSidebarOpen ? "Close Categories" : "Open Categories"}
                        </button>
                    </div>

                    <div className={`ngosidebar fixed flex flex-col items-center left-0 top-20 bg-[#d9ced0] w-3/12 p-2 rounded-r-2xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ zIndex: 1000 }}>
                        <button  className="absolute top-2 right-2 text-5xl font-bold cursor-pointer" onClick={toggleSidebar}> 
                            &times;
                        </button>
                        <h2 className="text-3xl font-bold mb-6">Categories</h2>
                        <hr className="mb-4" />
                        <div className="types flex flex-col text-center items-center">
                            {ngoTypesArray.map((type, index) => (
                                <span key={index} ref={(el) => typeRefs.current[index] = el} className={`catespan w-full rounded-full font-semibold border-b-4 ${selectedType === type ? "bg-gray-200 font-bold" : ""}`} style={{ padding: "2%"}} onClick={() => handleTypeClick(type)}> {type}
                                </span>
                            ))}
                        </div>
                    </div>

                    {isSidebarOpen && (
                        <div  className="fixed inset-0 bg-black opacity-50 z-500" onClick={toggleSidebar}  style={{ zIndex: 900 }} ></div>
                    )}

                    <div className="ngos h-full flex justify-around overflow-hidden">
                        <div className="ngogrid lg:grid lg:grid-cols-3 w-full">
                            {filteredNgos.map((ngo, index) => (
                                <div ref={(el) => (ngoRefs.current[index] = el)} className="card lg:w-10/12 m-5 shadow-2xl" style={{ backgroundImage: `url(${ngo.logo})`,
                                        height: '50vh',
                                    }} onClick={() => handleViewMore(ngo)} key={index}>
                                    <div className="card-content p-5">
                                        <h1 className="card-title text-5xl font-bold m-2">{ngo.name}</h1>
                                        <p className="card-body text-2xl font-semibold m-2">{ngo.description}</p>
                                        <button className="button" onClick={() => handleViewMore(ngo)}>
                                            View More
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
