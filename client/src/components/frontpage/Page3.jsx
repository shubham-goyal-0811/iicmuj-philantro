import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Page3() {

    useEffect(() => {
        const svgPaths = document.querySelectorAll('.svg1 path');

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
                        trigger: '.benefitsheading',
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );
        });

        const svgPaths2 = document.querySelectorAll('.svg2 path');

        svgPaths2.forEach(svgLine => {
            gsap.fromTo(svgLine,
                {
                    strokeDasharray: svgLine.getTotalLength(),
                    strokeDashoffset: svgLine.getTotalLength()
                },
                {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: '.donorheading',
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );
        });
        console.log(document.querySelectorAll('.leftdiv1'));
        gsap.fromTo(".leftdiv01", {
            x: 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".leftdiv01",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".leftdiv02", {
            x: 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".leftdiv02",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".leftdiv03", {
            x: 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".leftdiv03",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".leftdiv4", {
            x: 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".leftdiv4",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".leftdiv5", {
            x: 100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".leftdiv5",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".odd", {
            x: -100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".odd",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
        gsap.fromTo(".even", {
            x: -100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: ".even",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }, []);

    const reviews = [
        {
            name: "Mr. Shwetank Dohroo",
            review: "PhilanthroHub is exactly what I've been looking for! As someone who loves to support meaningful causes, this platform makes it so easy to find and connect with NGOs that align with my values. The directory is comprehensive, and the information provided helps me make informed decisions about where to donate. Highly recommended!"
        },
        {
            name: "Mr. Shubham Goyal",
            review: "I’ve always wanted to contribute to global causes but found it challenging to navigate through the sea of NGOs out there. PhilanthroHub simplifies the entire process. The platform's user-friendly design and extensive NGO listings have helped me find organizations that truly make a difference. Great job, PhilanthroHub team!"
        },
        {
            name: "Mr. Siddham Jain",
            review: "PhilanthroHub has made it so easy for me to support causes that matter. I appreciate the detailed information on each NGO, which gives me confidence that my donations are going to the right places. It’s amazing to have all this in one place. I’ll definitely keep coming back!"
        }
    ];
    return (
        <>
            <div className="frontpage_main3 flex flex-col w-auto items-center">
                <div className="frontpage_part3 w-full">
                    <div className="questionPhilantro flex justify-center">
                        <div className="philantro text-6xl font-bold">
                            <h1>Philantro Hub?</h1>
                        </div>
                    </div>
                    <div className="whatis flex flex-col items-center">
                        <div className="whatisphilantro text-4xl font-semibold">
                            <h1>What are we?</h1>
                        </div>
                        <div className="desc flex justify-center text-center w-6/12 text-2xl border-4">
                            <h2>PhilanthroHub is an innovative platform designed to bridge the gap between compassionate donors and impactful NGOs around the world. Our mission is to simplify the process of finding and supporting non-profit organizations by providing a comprehensive directory of NGO contacts.</h2>
                        </div>
                        <div className="tbl2 flex flex-col w-full justify-between">
                            <div className="flex flex-col text-left benefits w-full h-full">
                                <div className="benefitsheading text-6xl font-bold flex justify-center">
                                    <h1>Benefits</h1>
                                </div>
                                <ul className="benefitstbl2 relative">
                                    <li className="flex items-center w-full justify-end h-full absolute" style={{ padding: '2%' }}>
                                        <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg" className="svg1" style={{ marginRight: '10%' }}>
                                            <path d="
                                                    M 150 150
                                                    C 175 125, 225 125, 250 150
                                                    S 275 175, 250 200
                                                    S 225 225, 200 200
                                                    S 175 175, 200 150
                                                    S 225 125, 250 100
                                                    S 275 75, 250 50
                                                    S 225 25, 200 50
                                                    S 175 75, 150 100
                                                    S 125 125, 100 100
                                                    S 75 75, 50 50
                                                    S 25 25, 50 0
                                                    " fill="none" stroke="black" strokeWidth="2" />
                                        </svg>
                                    </li>
                                    <li className="flex w-full" style={{ padding: '2%' }}>
                                        <div className="leftdiv01 flex flex-col items-start w-6/12">
                                            <h1 className="font-bold text-4xl">Comprehensive Directory:</h1>
                                            <p className="text-2xl">Access to a vast and well-organized directory of NGOs from around the world, making it easier to find organizations that align with your values and interests.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full" style={{ padding: '2%' }}>
                                        <div className="leftdiv02 flex flex-col items-start w-6/12">
                                            <h1 className="font-bold text-4xl">Simplified Donation Process:</h1>
                                            <p className="text-2xl">Streamlined tools and resources to make the donation process quick, easy, and secure, ensuring that your contributions reach the intended causes efficiently.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full" style={{ padding: '2%' }}>
                                        <div className="leftdiv03 flex flex-col items-start w-6/12">
                                            <h1 className="font-bold text-4xl">Verified NGOs:</h1>
                                            <p className="text-2xl">PhilanthroHub features vetted and credible NGOs, giving you peace of mind that your donations are going to legitimate and impactful organizations.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full" style={{ padding: '2%' }}>
                                        <div className="leftdiv4 flex flex-col items-start w-6/12">
                                            <h1 className="font-bold text-4xl">User-Friendly Interface:</h1>
                                            <p className="text-2xl">Contributing to causes you care about can provide a sense of satisfaction and purpose.</p>
                                        </div>
                                    </li>
                                    <li className="flex w-full" style={{ padding: '2%' }}>
                                        <div className="leftdiv5 flex flex-col items-start w-6/12">
                                            <h1 className="font-bold text-4xl">Tax Benefits:</h1>
                                            <p className="text-2xl">Designed with ease of use in mind, PhilanthroHub’s intuitive interface ensures a smooth and enjoyable experience for donors of all ages and tech-savviness levels.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="reviews w-full h-full flex flex-col text-right">
                                <div className="donorheading text-6xl font-bold flex justify-center">
                                    <h1>Donor's Appreciations</h1>
                                </div>
                                <ul className="revitbl relative">
                                    <li className="svg-container flex items-center justify-center w-4/12 h-full absolute" style={{ padding: '2%' }}>
                                        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" className="svg2">
                                            <path d="M 100,10
                                                     L 120,80
                                                     L 190,80
                                                     L 130,120
                                                     L 150,190
                                                     L 100,145
                                                     L 50,190
                                                     L 70,120
                                                     L 10,80
                                                     L 80,80
                                                     Z"
                                                fill="none" stroke="black" strokeWidth="2" />
                                        </svg>
                                    </li>
                                    {reviews.map((review, index) => (
                                        <li className={`review-item flex w-full justify-end ${index % 2 === 0 ? 'odd' : 'even'}`} style={{ padding: '2%' }} key={index}>
                                            <div className="flex flex-col justify-end w-7/12">
                                                <h1 className="font-bold text-4xl">{review.name}</h1>
                                                <p className='text-2xl'>{review.review}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
