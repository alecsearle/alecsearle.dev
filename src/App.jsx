import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Experience from "./components/Experience/Experience.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Contact from "./components/Contact/Contact.jsx";

function App() {
  return (
    <>
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
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
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
