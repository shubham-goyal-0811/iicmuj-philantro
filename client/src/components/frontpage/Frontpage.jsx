import { useEffect, useRef } from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Frontpage() {
    const sectionsRef = useRef([]);

    useEffect(() => {
        sectionsRef.current.forEach((section, index) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 100%",
                        end: "top 20%",
                        scrub: true,
                    },
                }
            );
        });
    }, []);

    return (
        <div className="main1 flex flex-col">
            <div
                className="page1"
                ref={(el) => (sectionsRef.current[0] = el)}
            >
                <Page1 />
            </div>
            <div
                className="page2"
                ref={(el) => (sectionsRef.current[1] = el)}
            >
                <Page2 />
            </div>
            <div
                className="page3"
                ref={(el) => (sectionsRef.current[2] = el)}
            >
                <Page3 />
            </div>
            <div
                className="page4"
                ref={(el) => (sectionsRef.current[3] = el)}
            >
                <Page4 />
            </div>
        </div>
    );
}
