import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
import BtnSpinner from "./BtnSpinner";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext";
import { DevTool } from "@hookform/devtools";

export default function Login() {
  const { authenticated, setAuthenticated } = useAuthContext();

  const navigate = useNavigate();
  const form = useForm({
    mode: "onTouched",
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const auth = localStorage.getItem("authToken");

  if (auth) {
    useEffect(() => {
      navigate("/"); // Navigate to the home route
    }, [navigate]);
  }

  const [eye, setEye] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //login api calling
  const onSubmit = (loginData) => {
    if (loginData) {
      setLoading(true);
    }

    //fetch api for login url
    fetch(BASE_URL + "/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Log In Failed");
        }
        return response.json();
      })
      .then((responseData) => {
        // console.log('Login successful:', data);
        setData(responseData);
        if (data) {
          const userData = responseData.data.user;

          localStorage.setItem("authToken", responseData.data.token);
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              userData,
            })
          );
          setLoading(false);
          setAuthenticated(true);

          //redirect to home page
          navigate("/");
        } else {
          throw new Error("Token not found in response");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error) {
          setErrorMessage("Phone Or Password is incorrect!");
          setLoading(false);
        }
      });
  };

  return (
    <>
      {!authenticated && (
        <div className="text-white homeBody">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-4">
                {errorMessage && (
                  <div
                    className="alert alert-danger mt-2"
                    role="alert"
                    style={{ fontSize: "14px" }}
                  >
                    {errorMessage}
                  </div>
                )}
                <div className="border border-1 rounded-3 shadow-lg p-4 loginCard">
                  <div className="text-center mb-4 me-4">
                    <Link to={"/"}>
                      <img className="logo" src={logo} />
                    </Link>
                  </div>

                  <h5 className="text-center mb-4">
                    Welcome To Spider-Man Slot
                  </h5>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className={`form-control ${
                          errors.phone && "border-2 border-danger"
                        }`}
                        id="phone"
                        placeholder="Enter Phone"
                        {...register("phone", {
                          required: "Phone is Required.",
                        })}
                      />
                      <div className="error text-danger">
                        {errors.phone?.message}
                      </div>
                    </div>
                    <div className="mb-3 password">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type={eye === false ? "password" : "text"}
                        className={`form-control ${
                          errors.password && "border-2 border-danger"
                        }`}
                        id="password"
                        placeholder="Enter Password"
                        {...register("password", {
                          required: "Password is Required.",
                        })}
                      />
                      <i
                        className={`fas eye ${eye ? "fa-eye-slash" : "fa-eye"}`}
                        onClick={() => setEye(!eye)}
                      ></i>
                      <div className="error text-danger">
                        {errors.password?.message}
                      </div>
                    </div>
                    <div className="my-4">
                      <button className="btn btn-red w-100 shadow py-2">
                        {loading && <BtnSpinner />}
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
