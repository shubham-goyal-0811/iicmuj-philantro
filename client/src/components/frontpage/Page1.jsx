import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Earth from '../../../public/Earth';
import Stars from '../../img/bgstars.jpg';
import Button from './Button';
import Typewriter from "typewriter-effect";

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % qts.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [qts.length]);

    return (
        <div className="frontpage_main1 flex flex-col w-auto items-center h-screen bg-black" style={{ padding: '1%', height: '92vh' }}>
            <div className="frontpape_part1 flex flex-col w-full h-full justify-between bg-opacity-0" style={{ backgroundImage: `url(${Stars})`, backgroundPosition: 'center', }}>
                <div className="front_content flex items-center justify-evenly w-full h-full">
                    <div className="flex flex-col w-6/12 h-full justify-center items-start">
                        <div className="title flex flex-col justify-center" style={{ marginTop: '1.1%' }}>
                            <div className="title1 lg:text-8xl md:text-6xl sm:text-4xl font-bold text-white">
                                <Typewriter options={{
                                    strings: ['PhilantroHub'], autoStart: true, loop: true, delay: 75, deleteSpeed: 50,
                                }}
                                />
                            </div>
                        </div>
                        <div className="quotes w-full flex items-center text-start justify-center text-white relative" style={{ margin: '1%', padding: '1%', height: '25vh' }}>
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>
                            <div className="flex flex-col act_qot w-full h-full items-start justify-center relative">
                                <h1 className="font-bold text-3xl">{qts[currentQuoteIndex].quote}</h1>
                                <p className="text-xl">{qts[currentQuoteIndex].by}</p>
                            </div>
                        </div>

                        <div className="buttonToStart flex justify-start w-full mt-4">
                            <Button />
                        </div>
                    </div>
                    <div className="picture w-10/12 sm:w-full h-full rounded-full">
                        <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
                            <ambientLight intensity={1.5} />
                            <OrbitControls enableZoom={false} />
                            <Suspense fallback={null}>
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
