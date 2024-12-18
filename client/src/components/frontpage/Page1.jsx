import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Earth from '../../../public/Earth';
import Stars from '../../img/bgstars.jpg';
import Button from './Button';
import Typewriter from "typewriter-effect";
import CanvasLoader from '../Loader';

export default function Page1() {
    const qts = [
        {
            quote: "The best way to not feel hopeless is to get up and do something. Don’t wait for good things to happen to you. If you go out and make some good things happen, you will fill the world with hope, you will fill yourself with hope.",
            by: "― Barack Obama"
        },
        {
            quote: "We only have what we give.",
            by: "― Isabel Allende"
        },
        {
            quote: "If you’re in the luckiest one per cent of humanity, you owe it to the rest of humanity to think about the other 99 per cent.",
            by: "― Warren Buffett"
        },
        {
            quote: "If you're not making someone else's life better, then you're wasting your time. Your life will become better by making other lives better.",
            by: "― Will Smith"
        },
        {
            quote: "Selfless giving is the art of living.",
            by: "― Frederic Lenz"
        },
        {
            quote: "The best way to find yourself is to lose yourself in the service of others.",
            by: "― Mahatma Gandhi"
        },
    ];
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [logged, setLogged] = useState(false);

    const fetchProfile = async () => {
        try{
            const response = await fetch('http://localhost:8001/api/v1/users/profile', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            const data = await response.json();
            if(data.success){
                setLogged(true);
            } 
            else{
                setLogged(false);
            }
        } 
        catch(error){
            console.error('Error fetching profile:', error);
            setLogged(false);
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % qts.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [qts.length]);//when length of qt changes, only then the re-render will happen
    return (
        <div className="frontpage_main1 flex flex-col w-auto items-center h-screen" style={{ height: '92vh' }}>
            <div className="frontpape_part1 flex flex-col w-full h-full justify-between" style={{ backgroundImage: `url(${Stars})`, backgroundPosition: 'center', }}>
                <div className="front_content flex items-center justify-evenly w-full h-full">
                    <div className="title-qt flex flex-col w-6/12 h-full justify-center items-center">
                        <div className="title flex flex-col justify-center" style={{ marginTop: '1.1%' }}>
                            <div className="title1 lg:text-8xl font-bold text-white">
                                <Typewriter options={{
                                    strings: ['PhilantroHub'], autoStart: true, loop: true, delay: 75, deleteSpeed: 50,
                                }}
                                />
                            </div>
                        </div>
                        <div className="quotes w-8/12 flex items-center text-start justify-center text-white relative" style={{ margin: '1%', padding: '1%', height: '25vh' }}>
                            <div className="absolute inset-0 rounded-2xl"></div>
                            <div className="flex flex-col act_qot h-full w-full bg-black bg-opacity-40 items-start justify-center relative">
                                <h1 className="font-bold lg:text-3xl">{qts[currentQuoteIndex].quote}</h1>
                                <p className="text-xl">{qts[currentQuoteIndex].by}</p>
                            </div>
                        </div>
                        <div className="buttonToStart flex justify-start w-full mt-4 md:justify-center">
                            {!logged && <Button />}
                        </div>
                    </div>
                    <div className="picture flex w-full h-full rounded-full lg:w-6/12 lg:h-6/12 md:w-full md:h-full sm:w-full sm:h-full">
                        <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
                            <ambientLight intensity={1.5} />
                            <OrbitControls enableZoom={false} />
                            <Suspense fallback={<CanvasLoader />}>
                                <Earth />
                            </Suspense>
                            <Environment preset="sunset" />
                        </Canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}
