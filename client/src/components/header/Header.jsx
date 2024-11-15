import Logo from './Logo';
import Options from './Options';
import Loginout from './Loginout';
import React, {useRef,useEffect, useState}from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const headerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
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
    return (
        <>
            <header className="w-full h-20 bg-black">
                <nav ref={headerRef} className={`w-full ${scrolled ? 'bg-custom' : 'bg-white'} fixed top-0 z-10 transition-colors duration-300 header_nav w-full`} style={{ padding: '0.5%' }}>
                    <div className="flex w-full items-center justify-between">
                        <Logo />
                        <Options  />
                        <Loginout />
                    </div>
                </nav>
            </header>
        </>
    );
}