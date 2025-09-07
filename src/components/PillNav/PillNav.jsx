import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PillNav.css";

const PillNav = () => {
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const [activeItem, setActiveItem] = useState(0);

  const navItems = [
    { label: "Home", target: "hero" },
    { label: "About", target: "about" },
    { label: "Projects", target: "projects" },
    { label: "Skills", target: "skills" },
    { label: "Contact", target: "contact" },
  ];

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleNavClick = (index, targetId) => {
    setActiveItem(index);
    scrollToSection(targetId);
  };

  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;

    if (!nav || !indicator) return;

    const updateIndicator = () => {
      const activeLink = nav.children[activeItem];
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;

        gsap.to(indicator, {
          x: offsetLeft,
          width: offsetWidth,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeItem]);

  return (
    <nav className="pill-nav">
      <div className="pill-nav__container" ref={navRef}>
        <div className="pill-nav__indicator" ref={indicatorRef}></div>
        {navItems.map((item, index) => (
          <button
            key={item.target}
            className={`pill-nav__item ${index === activeItem ? "active" : ""}`}
            onClick={() => handleNavClick(index, item.target)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default PillNav;
