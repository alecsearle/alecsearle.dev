import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    id: 1,
    company: "Alec Searle Dev",
    position: "Website Developer",
    location: "Remote",
    period: "Present",
    description: [
      "Build and launch WordPress websites for private clients, boosting online visibility and SEO reach.",
      "Provide ongoing hosting, content, and performance optimization support.",
    ],
  },
  {
    id: 2,
    company: "Zonos",
    position: "Landed Cost Audit Specialist",
    location: "St. George, UT",
    period: "Dec 2025 - Present",
    description: [
      "Audit landed cost quotes against actual import charges to identify discrepancies in duties, taxes, and fees.",
      "Analyze variance patterns and investigate root causes to improve accuracy of future quotes.",
      "Collaborate with product and operations teams to share insights that support process and system improvements.",
    ],
  },
  {
    id: 3,
    company: "ExpiTrans (Buzz Financial)",
    position: "ISV Opereations Lead / Developer",
    location: "St. George, UT",
    period: "Mar 2025 - Dec 2025",
    description: [
      "Served as the first hire in the Utah branch, helping grow the team from 2 to 10 ISV specialists while training each hire.",
      "Handled Tier 2 integration and troubleshooting tickets, resolving most issues without Tier 3 escalation.",
      "Acted as office lead and managed workflow and priorities when management was offsite.",
      "Collaborated across departments to ensure timely and efficient ticket resolution.",
      "Built a webhook automation system for converting warm leads into approved merchants, cutting response time by 80%.",
    ],
  },
  {
    id: 4,
    company: "HFB Technologies",
    position: "Frontend Developer",
    location: "St. George, UT",
    period: "Aug 2024 - Mar 2025",
    description: [
      "Implemented 60+ weekly updates for client WordPress/Divi sites across a 1,400-site portfolio.",
      "Collaborated directly with clients to clarify design requests and recommend UX improvements.",
    ],
  },
];

function Experience() {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const progress = progressRef.current;
    const section = sectionRef.current;

    if (!timeline || !progress || !section) return;

    // Animate timeline progress on scroll with dynamic speed
    const progressTween = gsap.fromTo(
      progress,
      {
        height: "0%",
      },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1, // Smoother scrub for more fluid movement
          onUpdate: (self) => {
            // Add subtle pulsing effect based on scroll velocity
            const velocity = Math.abs(self.getVelocity());
            const intensity = Math.min(velocity / 1000, 1);
            progress.style.filter = `drop-shadow(0 0 ${5 + intensity * 10}px rgba(42, 157, 143, ${
              0.6 + intensity * 0.4
            }))`;
          },
        },
      }
    );

    // Animate experience items with stagger
    const items = section.querySelectorAll(".experience-item");
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Add dot activation animation
      const dot = item.querySelector(".experience-dot");
      if (dot) {
        gsap.fromTo(
          dot,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      progressTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="about" ref={sectionRef}>
      <h1>Experience</h1>
      <div className="line"></div>
      <div className="timeline-container">
        {/* Timeline line */}
        <div className="timeline" ref={timelineRef}>
          <div className="timeline-progress" ref={progressRef}></div>
        </div>

        {/* Experience items */}
        <div className="experience-content">
          {experienceData.map((item, index) => (
            <div key={item.id} className="experience-item">
              <div className="experience-dot"></div>
              <div className="experience-card">
                <div className="experience-header">
                  <h3 className="company-name">{item.company}</h3>
                  <span className="period">{item.period}</span>
                </div>
                <div className="position-location">
                  <h4 className="position">{item.position}</h4>
                  {item.location && (
                    <span className="location">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginRight: "4px" }}
                      >
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                          fill="currentColor"
                        />
                      </svg>
                      {item.location}
                    </span>
                  )}
                </div>
                <ul className="description-list">
                  {item.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experience;
