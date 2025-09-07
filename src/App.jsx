import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Experience from "./components/Experience/Experience.jsx";
import Projects from "./components/Projects/Projects.jsx";

function App() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects
        textAutoHide={true}
        enableStars={false}
        enableSpotlight={false}
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={50}
        particleCount={12}
        glowColor="#2a9d8f"
      />
    </>
  );
}

export default App;
