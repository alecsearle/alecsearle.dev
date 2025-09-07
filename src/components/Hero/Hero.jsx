import "./Hero.css";
import portrait from "../../assets/portrait_transparent.png";
import SocialLinks from "../SocialLinks/SocialLinks.jsx";
import PillNav from "../PillNav/PillNav.jsx";
import DotGrid from "../DotGrid/DotGrid.jsx";

export default function Hero() {
  return (
    <section id="hero" className="hero-container">
      {/* DotGrid as background */}
      <DotGrid
        dotSize={2}
        gap={25}
        baseColor="#333333"
        activeColor="#2a9d8f"
        proximity={120}
        shockRadius={150}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
        className="hero-background"
      />

      {/* PillNav at the top */}
      <PillNav />

      {/* Hero content on top */}
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            <span className="h1-minimal">I'M</span> <span className="highlight">Alec Searle</span>
          </h1>
          <h2>Software Engineering Student & Web Developer</h2>
          <button className="contact-btn">Contact Me</button>
        </div>

        <div className="hero-image">
          <img src={portrait} alt="Portrait" />
        </div>

        <SocialLinks />
      </div>
    </section>
  );
}
