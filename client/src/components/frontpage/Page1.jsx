import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Earth from '../../../public/Earth';
import Stars from '../../img/bgstars.jpg';

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
        <>
            <div className="frontpage_main1 flex flex-col w-auto items-center h-screen bg-black" style={{ padding: '1%', height: '92vh' }}>
                <div className="frontpape_part1 flex flex-col w-full h-full justify-between" style={{ backgroundImage: `url(${Stars})` }}>

                    <div className="title flex justify-center" style={{ marginTop: '1.1%' }}>
                        <div className="t1 text-7xl font-bold text-white">
                            <span className="s1 inline-block">P</span><span className="s2 inline-block">H</span><span className="s3 inline-block">I</span><span className="s4 inline-block">L</span><span className="s5 inline-block">A</span><span className="s6 inline-block">N</span><span className="s7 inline-block">T</span><span className="s8 inline-block">R</span><span className="s9 inline-block">O</span>
                        </div>
                        <div className="t2 text-7xl font-bold text-white">
                            <span className="s10 inline-block">H</span><span className="s11 inline-block">U</span><span className="s12 inline-block">B</span>
                        </div>
                    </div>

                    <div className="front_content flex items-center justify-evenly w-full h-full">
                        <div className="picture w-8/12 h-full rounded-full">
                            <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
                                <ambientLight intensity={1.5}/>
                                <OrbitControls enableZoom={false} />
                                <Suspense fallback={null} > 
                                    <Earth/>
                                </Suspense>
                                <Environment preset='sunset'/>
                            </Canvas>
                        </div>
                        <div className="quotes w-2/5 flex items-center text-center justify-center text-white" style={{ margin: '1%', padding: '1%' }}>
                            <div className="act_qot">
                                <h1 className="font-bold text-3xl">{qts[currentQuoteIndex].quote}</h1>
                                <p className="text-xl">{qts[currentQuoteIndex].by}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}