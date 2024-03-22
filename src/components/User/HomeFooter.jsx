import React from "react";
import { Link } from "react-router-dom";

const HomeFooter = () => {
  const footer = [
    { icon: <i className="fa-solid fa-home"></i>, title: "Home" },
    { icon: <i className="fa-solid fa-lock"></i>, title: "Password" },
    { icon: <i className="fa-solid fa-bullhorn"></i>, title: "Promotion" },
    { icon: <i className="fa-solid fa-gamepad"></i>, title: "Game Logs" },
    { icon: <i className="fa-solid fa-history"></i>, title: "History" },
  ];
  return (
    <div className="homeFooter d-flex d-lg-none justify-content-between align-items-center">
      {footer.map((item) => {
        return (
          <Link
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
            className="footerItem text-decoration-none pt-2"
          >
            {item.icon}
            <p className="mt-2">{item.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default HomeFooter;
