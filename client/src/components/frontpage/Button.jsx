import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();
  const xTo = useRef(null);
  const yTo = useRef(null);
  const buttonRef = useRef(null);
  const divRef = useRef(null);
  //tracking the position of mouse pointer.
  const { contextSafe } = useGSAP(() => {
    xTo.current = gsap.quickTo(divRef.current, "x", { duration: 2, ease: "power3" });
    yTo.current = gsap.quickTo(divRef.current, "y", { duration: 2, ease: "power3" });

    gsap.to(divRef.current, {
      scale: 0,
      xPercent: -50,
      yPercent: -50,
      zIndex: -10,
    });
  }, { scope: buttonRef });
  //when entering
  const handleMouseEnter = contextSafe(() => {
    gsap.to(divRef.current, {
      scale: 1,
      duration: 1,
    });
  });
  //when leaving
  const handleMouseLeave = contextSafe(() => {
    gsap.to(divRef.current, {
      scale: 0,
      duration: 1,
    });
  });

  const handleMouseMove = contextSafe((e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const { top, left } = rect;
    xTo.current(e.clientX - left);
    yTo.current(e.clientY - top);
  });

  return (
    <button ref={buttonRef} className="relative border-2 border-solid border-white px-5 py-2 rounded-3xl text-black bg-white overflow-hidden hover:text-white z-0" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
      <div ref={divRef} className="absolute w-[200px] h-[150px] bg-black left-0 top-0 wrapperElement -z-10 pointer-events-none rounded-[50%]"></div>
      <span onClick={() => navigate('../Login')} className="z-10">Get Started!</span>
    </button>
  );
};

export default Button;
