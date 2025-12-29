import React, { useEffect, useRef, useState } from "react";
import OverlayMenu from "./OverlayMenu";
import Logo from "../assets/R.png"
import { TiThMenu } from "react-icons/ti";

export default function Navbar(){
const [menuopen, setMenuOpen] = useState(false); 
const [visible, setVisible] = useState(true);
const [forceVisible, setForceVisible] = useState(false);

const lastScrollY =useRef(0);
const timerId = useRef(null);
useEffect(() => {
  const homeSection = document.querySelector("#home");
  const observer = new IntersectionObserver(([entry]) => {
    if(entry.isIntersecting){
      setForceVisible(true);
      setVisible(true);
    } else {
      setForceVisible(false);
    }
    },{ threshold: 0.1}
  )
  if(homeSection) observer.observe(homeSection);
  return () => {
    if(homeSection) observer.unobserve(homeSection);
  }
}, [])


useEffect(() => {
  // initialize last scroll position
  lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;

  const handleScroll = () => {
    if (forceVisible) {
      setVisible(true);
      lastScrollY.current = window.scrollY;
      return;
    }

    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY.current;

    // small threshold to avoid jitter
    if (Math.abs(delta) < 5) return;

    if (delta > 0) {
      // scrolling down
      setVisible(false);
    } else {
      // scrolling up
      setVisible(true);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  };

}, [forceVisible]);


return(
  <>
  <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
  <div className=" flex items-center space-x-2">
    <img src={Logo} alt="logo"className="w-8 h-8"/>
    <div className="text-2xl font-bold text-white hidden sm:block">Rithish </div>

  </div>
  <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
  <button onClick={() => setMenuOpen(true)} 
    className="text-3xl text-white focus:outline-none"
    aria-label="open Menu"  >
    <TiThMenu />
  </button>
  </div>

  <div className="hidden lg:block">
    <a href="#contact"
    className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300">
      Reach out
    </a>


  </div>

  </nav>
  
  
  
  <OverlayMenu isOpen = {menuopen} onClose={() => setMenuOpen(false)} />
  </>
)


}