import "./SocialLinks.css";
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebookSquare } from "react-icons/fa";

function SocialLinks() {
  return (
    <div className="social-bar">
      <div className="line"></div>
      <a href="https://www.instagram.com/alec_srl/" target="_blank" rel="noreferrer">
        <FaInstagram />
      </a>
      <a href="https://www.facebook.com/alec.searle.54" target="_blank" rel="noreferrer">
        <FaFacebookSquare />
      </a>
      <a href="https://www.linkedin.com/in/alec-searle/" target="_blank" rel="noreferrer">
        <FaLinkedinIn />
      </a>
      <a href="https://github.com/alecsearle" target="_blank" rel="noreferrer">
        <FaGithub />
      </a>
    </div>
  );
}

export default SocialLinks;
