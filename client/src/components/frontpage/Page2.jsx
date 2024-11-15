import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Page2() {
    useEffect(() => {
        const svgLine = document.querySelector('svg path');

        gsap.fromTo(svgLine,
            { strokeDasharray: svgLine.getTotalLength(), strokeDashoffset: svgLine.getTotalLength() },
            {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: svgLine,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );

        const svgPaths = document.querySelectorAll('.svg2 path, .svg3 path');

        svgPaths.forEach(svgLine => {
            gsap.fromTo(svgLine,
                {
                    strokeDasharray: svgLine.getTotalLength(),
                    strokeDashoffset: svgLine.getTotalLength()
                },
                {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: svgLine,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );
        });


        gsap.fromTo(".leftdiv1", {
            x: 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".leftdiv1",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".leftdiv2", {
            x: 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".leftdiv2",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".leftdiv3", {
            x: 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".leftdiv3",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".rightdiv1", {
            x: -100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".rightdiv1",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".rightdiv2", {
            x: -100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".rightdiv2",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        // gsap.fromTo(".leftli1", {
        //     x: 100,
        //     opacity: 0
        // }, {
        //     x: 0,
        //     opacity: 1,
        //     scrollTrigger: {
        //         trigger: ".leftli1",
        //         start: "top bottom",
        //         end: "bottom top",
        //         scrub: true,
        //     }
        // });
        // gsap.fromTo(".leftli2", {
        //     x: 100,
        //     opacity: 0
        // }, {
        //     x: 0,
        //     opacity: 1,
        //     scrollTrigger: {
        //         trigger: ".leftli2",
        //         start: "top bottom",
        //         end: "bottom top",
        //         scrub: true,
        //     }
        // });
        // gsap.fromTo(".leftli3", {
        //     x: 100,
        //     opacity: 0
        // }, {
        //     x: 0,
        //     opacity: 1,
        //     scrollTrigger: {
        //         trigger: ".leftli3",
        //         start: "top bottom",
        //         end: "bottom top",
        //         scrub: true,
        //     }
        // });
        // gsap.fromTo(".rightli1", {
        //     x: -100,
        //     opacity: 0
        // }, {
        //     x: 0,
        //     opacity: 1,
        //     scrollTrigger: {
        //         trigger: ".rightli1",
        //         start: "top bottom",
        //         end: "bottom top",
        //         scrub: true,
        //     }
        // });
        // gsap.fromTo(".rightli2", {
        //     x: -100,
        //     opacity: 0
        // }, {
        //     x: 0,
        //     opacity: 1,
        //     scrollTrigger: {
        //         trigger: ".rightli2",
        //         start: "top bottom",
        //         end: "bottom top",
        //         scrub: true,
        //     }
        // });
    }, []);

    return (
        <>
            <div className="frontpage_main2 h-full flex flex-col w-auto items-center">
                <div className="frontpage_part2 w-full h-full">
                    <div className="questionNGO flex justify-center">
                        <div className="NGO? text-6xl font-bold">
                            <h1>NGO?</h1>
                        </div>
                    </div>
                    <div className="whatis flex flex-col h-full items-center">
                        <div className="whatisngo text-4xl font-semibold">
                            <h1>What are NGOs?</h1>
                        </div>
                        <div className="ans flex justify-center text-center w-6/12 text-2xl border-4">
                            <h2>A Non-Governmental Organization (NGO) is an independent, non-profit group dedicated to addressing social, environmental, and humanitarian issues. They work outside government control, advocating for causes like human rights, education, and health. NGOs empower communities, provide services, and influence policies to create positive social change.</h2>
                        </div>
                        <div className="types_whatis">
                            <a href=""><h2>Know the Types of NGOs</h2></a>
                        </div>
                        <div className="tbl flex flex-col w-full h-full items-center">
                            <div className="flex flex-col benefits w-full h-auto">
                                <div className="text-6xl font-bold flex justify-center">
                                    <h1>Benefits</h1>
                                </div>
                                <ul className="flex flex-col items-center">
                                    <li className="flex w-full justify-center" style={{ padding: '2%' }}>
                                        <svg width="20" height="900" xmlns="http://www.w3.org/2000/svg" className="svg001 absolute">
                                            <path d="
                                                    M 0 0
                                                    L 15 20
                                                    L 0 40
                                                    L 15 60
                                                    L 0 80
                                                    L 15 100
                                                    L 5 120
                                                    L 15 140
                                                    L 0 160
                                                    L 15 180
                                                    L 0 200
                                                    L 15 220
                                                    L 0 240
                                                    L 15 260
                                                    L 0 280
                                                    L 15 300
                                                    L 0 320
                                                    L 15 340
                                                    L 0 360
                                                    L 15 380
                                                    L 0 400
                                                    L 15 420
                                                    L 0 440
                                                    L 15 460
                                                    L 0 480
                                                    L 15 500
                                                    L 0 520
                                                    L 15 540
                                                    L 0 560
                                                    L 15 580
                                                    L 0 600
                                                    L 15 620
                                                    L 0 640
                                                    L 15 660
                                                    L 0 680
                                                    L 15 700
                                                    L 0 720
                                                    L 15 740
                                                    L 0 760
                                                    L 15 780
                                                    L 0 800
                                                    L 15 820
                                                    L 0 840
                                                    L 15 860
                                                    L 0 880
                                                    L 15 900" fill="none" stroke="black" strokeWidth="2" />
                                        </svg>
                                    </li>
                                    <li className="flex w-full justify-start" style={{ padding: '2%' }}>
                                        <div className="leftdiv1 flex flex-col items-start w-5/12">
                                            <h1 className="font-bold text-4xl">Support for Important Causes:</h1>
                                            <p className="text-2xl">Your contributions can help fund essential programs and services, such as education, healthcare, and environmental conservation.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full justify-end" style={{ padding: '2%' }}>
                                        <div className="rightdiv1 flex flex-col items-end text-right w-5/12">
                                            <h1 className="font-bold text-4xl">Positive Impact on Communities:</h1>
                                            <p className="text-2xl">Donations can lead to significant improvements in the quality of life for individuals and communities in need.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full justify-start" style={{ padding: '2%' }}>
                                        <div className="leftdiv2 flex flex-col items-start w-5/12">
                                            <h1 className="font-bold text-4xl">Advancement of Social Justice:</h1>
                                            <p className="text-2xl">NGOs often work on issues related to human rights and social equity, helping to address and rectify injustices.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full justify-end" style={{ padding: '2%' }}>
                                        <div className="rightdiv2 flex flex-col items-end text-right w-5/12">
                                            <h1 className="font-bold text-4xl">Personal Fulfillment:</h1>
                                            <p className="text-2xl">Contributing to causes you care about can provide a sense of satisfaction and purpose.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full justify-start" style={{ padding: '2%' }}>
                                        <div className="leftdiv3 flex flex-col items-start w-5/12">
                                            <h1 className="font-bold text-4xl">Tax Benefits:</h1>
                                            <p className="text-2xl">In many countries, donations to registered charities or NGOs are tax-deductible.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="howtopoints flex flex-col w-full h-full">
                                <div className="text-6xl flex flex-col items-center font-bold justify-center">
                                    <h1>How to Donate?</h1>
                                    <p className="text-2xl">comming soon</p>
                                </div>
                                <ul className="flex flex-col space-y-4 items-center">
                                    {/* <li className="flex w-full justify-start" style={{ padding: '2%' }}>
                                        <svg width="20" height="3000" xmlns="http://www.w3.org/2000/svg" className="svg2 absolute">
                                            <path d="
                                                    M 10 0
                                                    Q 0 50, 10 100
                                                    T 10 200
                                                    Q 0 250, 10 300
                                                    T 10 400
                                                    Q 0 450, 10 500
                                                    T 10 600
                                                    Q 0 650, 10 700
                                                    T 10 800
                                                    Q 0 850, 10 900
                                                    T 10 1000
                                                    Q 0 1050, 10 1100
                                                " fill="none" stroke="black" strokeWidth="2" />
                                        </svg>
                                    </li>
                                    <li className="flex w-full justify-end" style={{ padding: '2%' }}>
                                        <svg width="20" height="1000" xmlns="http://www.w3.org/2000/svg" className="svg3 absolute">
                                            <path d="
                                                    M 10 0
                                                    Q 0 50, 10 100
                                                    T 10 200
                                                    Q 0 250, 10 300
                                                    T 10 400
                                                    Q 0 450, 10 500
                                                    T 10 600
                                                    Q 0 650, 10 700
                                                    T 10 800
                                                    Q 0 850, 10 900
                                                    T 10 1000
                                                " fill="none" stroke="black" strokeWidth="2" />
                                        </svg>
                                    </li> */}
                                    {/* <li className="flex w-full justify-start" style={{ padding: '2%' }}>
                                        <div className="leftli1 flex flex-col items-start w-5/12" style={{ margin: '1%' }}>
                                            <h1 className="font-bold text-xl">Support for Important Causes:</h1>
                                            <p>Your contributions can help fund essential programs and services, such as education, healthcare, and environmental conservation.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full justify-end" style={{ padding: '2%' }}>
                                        <div className="rightli1 flex flex-col items-end text-right w-5/12" style={{ margin: '1%' }}>
                                            <h1 className="font-bold text-xl">Positive Impact on Communities:</h1>
                                            <p>Donations can lead to significant improvements in the quality of life for individuals and communities in need.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full justify-start" style={{ padding: '2%' }}>
                                        <div className="leftli2 flex flex-col items-start w-5/12" style={{ margin: '1%' }}>
                                            <h1 className="font-bold text-xl">Advancement of Social Justice:</h1>
                                            <p>NGOs often work on issues related to human rights and social equity, helping to address and rectify injustices.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full justify-end" style={{ padding: '2%' }}>
                                        <div className="rightli2 flex flex-col items-end text-right w-5/12" style={{ margin: '1%' }}>
                                            <h1 className="font-bold text-xl">Personal Fulfillment:</h1>
                                            <p>Contributing to causes you care about can provide a sense of satisfaction and purpose.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full justify-start" style={{ padding: '2%' }}>
                                        <div className="leftli3 flex flex-col items-start w-5/12" style={{ margin: '1%' }}>
                                            <h1 className="font-bold text-xl">Tax Benefits:</h1>
                                            <p>In many countries, donations to registered charities or NGOs are tax-deductible.</p>
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
