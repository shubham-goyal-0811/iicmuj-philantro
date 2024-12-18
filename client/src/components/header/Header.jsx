import Logo from './Logo';
import Options from './Options';
import Loginout from './Loginout';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const headerRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [isNGO, setIsNGO] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8001/api/v1/users/profile', { withCredentials: true })
            .then(response => {
                const user = response.data;
                if (user.data.role === 'NGO') {
                    setIsNGO(true);
                } else {
                    setIsNGO(false);
                }
            })
            .catch(err => {
                console.error("Error fetching user data:", err);
                setIsNGO(false);
            })
            .finally(() => {
                setLoading(false);
            });
        gsap.fromTo(headerRef.current,
            { y: -100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 4,
                ease: "power2.out",
            }
        );

        const handleScroll = () => {
            if(window.scrollY > 10){
                setScrolled(true);
            }
            else{
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navigate = useNavigate();

    if(loading){
        return (
            <header className="header w-full h-20 bg-black">
                <nav ref={headerRef} className={`w-full ${scrolled ? 'bg-custom' : 'bg-transparent text-white'} fixed top-0 z-10 transition-colors duration-300 header_nav w-full`} style={{ padding: '0.5%' }}>
                    <div className="flex w-full items-center justify-between">
                        <Logo />
                        <Options />
                        <div>Loading...</div>
                    </div>
                </nav>
            </header>
        );
    }
    return (
        <>
            <header className="header w-full h-20 bg-black">
                {scrolled ? 
                <nav ref={headerRef} className={`w-full bg-none fixed top-0 z-10 transition-colors duration-300 header_nav`} style={{ padding: '0.5%' }}>
                    <div className="flex w-full h-full justify-center ">
                        <div className={`effectwala flex w-3/12 items-center justify-between rounded-2xl ${scrolled ? 'bg-custom' : 'bg-transparent text-white'} duration-300 p-3`}>
                            <Options scrolled={scrolled} />
                        </div>
                    </div>
                </nav> :
                    <nav ref={headerRef} className={`w-full text-white fixed top-0 z-10 transition-colors duration-300 header_nav`} style={{ padding: '0.5%' }}>
                        <div className="flex w-full items-center justify-between">
                            <Logo scrolled={scrolled} />
                            <Options scrolled={scrolled} />
                            <div className="flex justify-around px-6 gap-5">
                                <Loginout isNgo = {isNGO} />
                            </div>
                        </div>
                    </nav>
                }
            </header>
        </>
    );
}
