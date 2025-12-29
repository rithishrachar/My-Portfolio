import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import React from "react";
import Qualification from "./sections/Qualification";
import Internship from "./sections/Internship";

export default function App(){
  const [introDone, setIntroDone] = React.useState(false);
  return(

    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)}/>}
      {introDone && (

    <div className="relative gradient text-white scroll-smooth">
    <CustomCursor />

    
    <Navbar/>
    <Home/>
    <About/>
    <Skills/>
    <Projects/>
    <Qualification/>
    <Internship/>
    <Contact/>
    <Footer/>

    </div>
    )}
    </>
  )
}