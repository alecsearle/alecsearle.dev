import { useState } from "react";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Replace this URL with your actual form handler (Netlify, Formspree, etc.)
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "alec@alecsearle.dev",
      link: "mailto:alec@alecsearle.dev",
    },
    {
      icon: <FaLinkedinIn />,
      label: "LinkedIn",
      value: "linkedin.com/in/alecsearle",
      link: "https://linkedin.com/in/alec-searle",
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      value: "github.com/alecsearle",
      link: "https://github.com/alecsearle",
    },
  ];

  return (
    <div className="contact">
      <h1>Contact</h1>
      <div className="line"></div>

      <div className="contact__content">
        <div className="contact__info">
          <h2>Let's Connect</h2>
          <p>
            I'm always interested in discussing new opportunities, collaborating on projects, or
            just having a conversation about technology and development. Feel free to reach out!
          </p>

          <div className="contact__links">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="contact__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact__icon">{item.icon}</span>
                <div>
                  <span className="contact__label">{item.label}</span>
                  <span className="contact__value">{item.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" className="form__submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitStatus === "success" && (
            <p className="form__message form__message--success">
              Thank you! Your message has been sent successfully.
            </p>
          )}

          {submitStatus === "error" && (
            <p className="form__message form__message--error">
              Sorry, there was an error sending your message. Please try again or contact me
              directly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;
