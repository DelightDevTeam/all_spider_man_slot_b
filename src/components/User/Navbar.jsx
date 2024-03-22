import React, { useEffect, useState } from "react";
import "../../assets/css/navbar.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
import BtnSpinner from "../Auth/BtnSpinner";
import useFetch from "../../hooks/useFetch";

const Navbar = () => {
  let auth = localStorage.getItem("token");
  let [url, setUrl] = useState(BASE_URL + "/user");
  const {data:user} = useFetch(url);

  useEffect(() => {
    setUrl(BASE_URL + "/user");
  }, [url]);

  let navigate = useNavigate();
  let [smallLoad, setSmallLoad] = useState(false);


  const logOut = (e) => {
    e.preventDefault();
    setSmallLoad(true);
    //fetch api for logout url
    fetch(BASE_URL + "/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        setSmallLoad(true);
        return response.json();
      })
      .then((data) => {
        localStorage.removeItem("token");
        localStorage.removeItem("authUser");
        // alert("Logged Out Successfully.");
        setSmallLoad(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
    {!auth && (
      <>
        <div className="navbar d-flex justify-content-between justify-content-lg-center">
          <Link to={"/"}>
            <img className="logo " src={logo} />
          </Link>

          <Link to={"/login"} className="loginBtn text-decoration-none">
            Login
          </Link>
        </div>
      </>
    )}
    {auth && (
      <>
        <div className="navbar d-flex justify-content-between">
          <div>
            <Link to={"/"}>
              <img className="logo" src={logo} />
            </Link>
          </div>
          <div className="">
            <div className="dropdown-center d-inline me-3">
              <a
                className="text-decoration-none"
                href="#"
              >
                {/* <i
                  className="fas fa-wallet text-white"
                  style={{ fontSize: "20px" }}
                ></i> */}
                <span className="text-white">
                  K{parseFloat(user?.balance).toLocaleString()}
                </span>
              </a>
            </div>
            <Link
              to="/profile"
              className="text-decoration-none text-white me-3"
            >
              <i
                className="fa-regular fa-user-circle"
                style={{ fontSize: "20px" }}
              ></i>
            </Link>
            <button className="loginBtn" onClick={logOut}>
              {smallLoad && <BtnSpinner />}
              Logout
            </button>
          </div>
        </div>
      </>
    )}


    </>
  );
};

export default Navbar;
