import React from "react";
import { Link } from "react-router-dom";

const HeroSideBar = () => {
  const sidebar = [
    { icon: <i className="fa-solid fa-home"></i>, title: "Home" },
    { icon: <i className="fa-solid fa-lock"></i>, title: "Password" },
    { icon: <i className="fa-solid fa-bullhorn"></i>, title: "Promotion" },
    { icon: <i className="fa-solid fa-gamepad"></i>, title: "Game Logs" },
    { icon: <i className="fa-solid fa-history"></i>, title: "History" },
  ];
  return (
    <div className="d-none d-lg-flex flex-column heroSidebar shadow">
      {sidebar.map((item) => {
        return (
          <Link
            className="text-decoration-none text-white"
            to={
              item.title === "Home"
                ? "/"
                : item.title === "Password"
                ? "/password"
                : item.title == "Promotion"
                ? "/promotion"
                : item.title == "Game Logs"
                ? "/game_logs"
                : "/history"
            }
            key={item.title}
          >
            {item.icon}
            <p>{item.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default HeroSideBar;
