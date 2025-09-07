import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    id: 1,
    company: "Alec Searle Dev",
    position: "Private Web Development",
    period: "Present",
    description: [
      "Design and develop custom websites for clients using modern web technologies",
      "Collaborate with clients to understand their requirements and deliver tailored solutions that meet their needs",
      "Maintain and update existing websites to ensure optimal performance, security, and user experience",
    ],
  },
  {
    id: 2,
    company: "ExpiTrans (Buzz Financial)",
    position: "ISV Support Specialist Lead",
    period: "Mar 2025 - Present",
    description: [
      "Lead a team of support specialists providing technical assistance for payment processing partners",
      "Coordinate resolution of technical issues, escalations, and ensure timely communication with partners",
      "Develop custom software solutions to streamline internal processes and enhance client experience",
    ],
  },
  {
    id: 3,
    company: "HFB Technologies",
    position: "Development Coordinator -> Web Management Developer",
    period: "Aug 2024 - Mar 2025",
    description: [
      "Coordinated development tasks, managed timelines, and facilitated communication between developers and clients",
      "Developed and maintained client websites using Divi and WordPress",
      "Communicated directly with clients to clarify request needs and recommend improvements",
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
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="experience-container">
        <h1 className="experience-title">Experience</h1>

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
                  <h4 className="position">{item.position}</h4>
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
    </section>
  );
}

export default Experience;
