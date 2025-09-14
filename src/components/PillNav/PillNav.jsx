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
    { label: "Experience", target: "experience" },
    { label: "Projects", target: "projects" },
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

  // Intersection Observer for scroll-based navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0% -80% 0%", // Trigger when section is 20% from top
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          const index = navItems.findIndex((item) => item.target === targetId);
          if (index !== -1) {
            setActiveItem(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.target);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;

    if (!nav || !indicator) return;

    const updateIndicator = () => {
      const activeLink = nav.children[activeItem + 1]; // +1 to skip the indicator element
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;

        gsap.to(indicator, {
          x: offsetLeft - 8, // Subtract the container's padding (0.5rem = 8px)
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
