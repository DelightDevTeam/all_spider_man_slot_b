import React, { useEffect, useState } from "react";
import "../../assets/css/navbar.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
import BtnSpinner from "../Auth/BtnSpinner";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { wallets, setWallets, authenticated, setAuthenticated } =
    useAuthContext();

  const [user, setUser] = useState();

  let auth = localStorage.getItem("authToken");
  let authUser = localStorage.getItem("authUser");

  let navigate = useNavigate();
  let [smallLoad, setSmallLoad] = useState(false);

  let url = BASE_URL + "/wallet/currentWallet";
  let { data: wallet, loading, error } = useFetch(url);

  // console.log(wallet);

  const getAuthUser = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/user", { headers })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setWallets(wallet);
  }, [wallet]);

  useEffect(() => {
    getAuthUser();
  }, [wallets]);

  const logOut = (e) => {
    e.preventDefault();
    setSmallLoad(true);
    //fetch api for logout url
    fetch(BASE_URL + "/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
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
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        // alert("Logged Out Successfully.");
        setSmallLoad(false);
        setAuthenticated(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      {!authenticated && (
        <div className="navbar d-flex justify-content-between justify-content-lg-center">
          <Link to={"/"}>
            <img className="logo " src={logo} />
          </Link>

          <Link to={"/login"} className="loginBtn text-decoration-none">
            Login
          </Link>
        </div>
      )}
      {authenticated && (
        <div className="navbar d-flex justify-content-between">
          <div>
            <Link to={"/"}>
              <img className="logo " src={logo} />
            </Link>
          </div>
          <div className="">
            <div className="dropdown-center d-inline me-3">
              <a
                className="btn dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="fas fa-wallet text-white"
                  style={{ fontSize: "20px" }}
                ></i>
                <span className="text-white ms-2">
                  K{parseFloat(user?.balance).toLocaleString()}
                </span>
              </a>
              <ul className="dropdown-menu" style={{ width: "200px" }}>
                {wallets && (
                  <>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>WALLET</span>
                          <span>
                            K{parseFloat(user?.balance).toLocaleString()}
                          </span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>ASIAGAMING</span>
                          <span>{wallets.ag_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>GAMEPLAY</span>
                          <span>{wallets.g8_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>BBIN</span>
                          <span>{wallets.gb_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>JDB</span>
                          <span>{wallets.jd_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>JOKER</span>
                          <span>{wallets.jk_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>KING855</span>
                          <span>{wallets.k9_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>NEW LIVE22</span>
                          <span>{wallets.l4_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>PGSOFT</span>
                          <span>{wallets.pg_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>PRAGMATIC</span>
                          <span>{wallets.pr_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>KING MAKER</span>
                          <span>{wallets.re_wallet}</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item py-2" href="#">
                        <div className="d-flex justify-content-between">
                          <span>SBO</span>
                          <span>{wallets.s3_wallet}</span>
                        </div>
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <Link
              to="/profile"
              className="text-decoration-none text-white me-4"
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
      )}
    </>
  );
};

export default Navbar;
