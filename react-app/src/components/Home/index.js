import "./Home.css";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import AboutLinks from "../AboutLinks";

const Home = () => {
  return (
    <div className="home">
      <NavBar className="nav" />
      <div className="home_container">
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
        <div className="main_content">
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
          <h2 className="no_margin">Produced by</h2>
        </div>

        <div className="technologies">
          <h2 className="no_margin">Technologies Used</h2>
        </div>
        <div className="links">
          <AboutLinks />
        </div>
      </div>
    </div>
  );
};

export default Home;
