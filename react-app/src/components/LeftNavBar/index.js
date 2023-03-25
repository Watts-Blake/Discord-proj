import "./LeftNavBar.css";
import Servers from "../Servers";
import CreateServerModal from "../CreateServer/CreateServerModal";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const LeftNavBar = ({ userServers, user }) => {
  const [hover, setHover] = useState(false);

  return (
    user && (
      <div className="left_side" id="left_nav">
        <NavLink
          className="home_dm_btn"
          to={`/channels/@me`}
          onMouseEnter={() => setHover("home")}
          onMouseLeave={() => setHover(null)}
        >
          <div
            className={
              hover === "home" ? "icon_container hover_home" : "icon_container"
            }
          >
            <img
              className="left_side_icon"
              src="/svgs/gray-disc-home.svg"
              alt="home"
            ></img>
          </div>
        </NavLink>
        <span className="home_seperator" />
        <Servers userServers={userServers}></Servers>
        <CreateServerModal></CreateServerModal>
        <NavLink
          to="/guild-discovery"
          onMouseEnter={() => setHover("guild")}
          onMouseLeave={() => setHover(null)}
        >
          <div
            className={
              hover === "guild" ? "hover icon_container" : "icon_container"
            }
          >
            <img
              className="left_side_icon"
              src={
                hover === "guild"
                  ? "/svgs/svgexport-16-white.svg"
                  : "/svgs/svgexport-16.svg"
              }
              alt="explore"
            ></img>
          </div>
        </NavLink>
        <a
          href="https://github.com/Watts-Blake/Discord-proj"
          onMouseEnter={() => setHover("git")}
          onMouseLeave={() => setHover(null)}
        >
          <div
            className={
              hover === "git" ? "icon_container hover_social" : "icon_container"
            }
          >
            <img
              className="left_side_icon"
              src={
                hover === "git" ? "/svgs/github-gray.svg" : "/svgs/github.svg"
              }
              alt="github"
            />
          </div>
        </a>
        <a
          href="https://www.linkedin.com/in/blake-watts-b91428123/"
          onMouseEnter={() => setHover("linked")}
          onMouseLeave={() => setHover(null)}
        >
          <div
            className={
              hover === "linked"
                ? "icon_container hover_social"
                : "icon_container"
            }
          >
            <img
              className="left_side_icon"
              src={
                hover === "linked"
                  ? "/svgs/LinkedIn-blue.svg"
                  : "/svgs/LinkedIn.svg"
              }
              alt="linkedin"
            />
          </div>
        </a>
      </div>
    )
  );
};

export default LeftNavBar;
