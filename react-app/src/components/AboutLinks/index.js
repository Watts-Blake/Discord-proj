import "./AboutLinks.css";
import { Link } from "react-router-dom";

const AboutLinks = () => {
  return (
    <div className="about_links_container">
      <a href="https://github.com/Watts-Blake/Discord-proj" className="github">
        <img src="/svgs/github.svg" alt="github" />
      </a>
      <a
        href="https://www.linkedin.com/in/blake-watts-b91428123/"
        className="linkedin"
      >
        <img src="/svgs/LinkedIn.svg" alt="linkedin" />
      </a>
    </div>
  );
};

export default AboutLinks;
