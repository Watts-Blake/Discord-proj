import "./Home.css";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home_container">
        <NavBar className="nav" />
        <img
          className="home_main"
          src="/svgs/home-main.svg"
          alt="home-center"
        />

        <img className="home_left" src="/svgs/home-left.svg" alt="home-left" />
        <img
          className="home_right"
          src="/svgs/home-right.svg"
          alt="home-right"
        />
        <div className="main_home_content">
          <h1 className="title">IMAGINE A PLACE...</h1>
          <p className="description">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>

          <Link to="/login" className="launch_btn">
            Open Diss-cord in your browser
          </Link>
        </div>
      </div>
      <div className="home_footer">
        <div className="produced">
          <h2 className="no_margin">Blake Watts</h2>
          <div className="links">
            <a
              href="https://github.com/Watts-Blake/Discord-proj"
              className="github"
            >
              <img src="/svgs/github.svg" alt="github" />
            </a>
            <a
              href="https://www.linkedin.com/in/blake-watts-b91428123/"
              className="linkedin"
            >
              <img src="/svgs/LinkedIn.svg" alt="linkedin" />
            </a>
          </div>
        </div>

        <div className="technologies">
          <img className="tech python" src="/svgs/python.svg" alt="react" />
          <img className="tech js" src="/svgs/java.svg" alt="react" />
          <img className="tech" src="/svgs/react.svg" alt="react" />
          <img className="tech flask" src="/svgs/flask.svg" alt="react" />
          <img className="tech aws" src="/svgs/aws.svg" alt="react" />
          <img className="tech socket" src="/svgs/socket.svg" alt="react" />
        </div>
        <div className="actual_footer">
          <Link to="/" className="home_link">
            <img src="/svgs/gray-disc-home.svg" alt="home" />
            <h3>Diss-cord</h3>
          </Link>

          <Link to="/login" className="launch_btn small">
            Open Diss-cord
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
