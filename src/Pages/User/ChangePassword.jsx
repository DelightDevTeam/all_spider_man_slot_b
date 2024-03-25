import React, { useEffect, useState } from "react";
import "../../assets/css/navbar.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
import useFetch from "../../hooks/useFetch";
import { Alert } from "react-bootstrap";
import SmallSpinner from "../../components/spinner/SmallSpinner";

const ChangePassword = () => {
  let auth = localStorage.getItem("token");
  let navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: authUser } = useFetch(BASE_URL + "/user");
  const[user, setUser] = useState(authUser);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loader, setLoader] = useState(false);

  if (!auth) {
    useEffect(() => {
      navigate("/");
    }, [navigate]);
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setLoader(true);
    const inputData = {
      current_password: currentPassword,
      password: password,
      password_confirmation: confirmPassword,
    };
    // console.log(inputData);
    fetch(BASE_URL + "/changePassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(inputData),
    })
      .then(async (response) => {
        if (!response.ok) {
          setLoader(false);
          let errorData;
          try {
            errorData = await response.json();
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
          if (response.status === 422) {
            setError(errorData.errors);
            console.error(`${response.status}:`, errorData);
          } else if (response.status === 401) {
            setError(errorData.message);
            setTimeout(() => {
              setError("");
            }, 3000);
            console.error(`${response.status}:`, errorData);
          } else {
            console.error(`Unexpected error with status ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setLoader(false);
        setSuccess("New Password Changed Successfully.");
        setError("")
        setTimeout(() => {
          setSuccess("");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3">
            <div style={{ paddingBottom: 200 }} className="pt-2">
              <h6
                className="text-center p-3"
                style={{ color: "#fff", fontWeight: "bolder" }}
              >
                လျှို့ဝှက်နံပါတ်ပြောင်းမည်
              </h6>
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="container my-4">
                <form onSubmit={handlePassword}>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="လျှို့ဝှက်နံပါတ်အဟောင်း"
                      name="current_password"
                      id="current_password"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      value={currentPassword}
                    />
                    {error?.current_password && <p className="text-danger">{error?.current_password}</p>}
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="လျှို့ဝှက်နံပါတ်အသစ်"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    {error?.password && <p className="text-danger">{error?.password}</p>}
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="လျှို့ဝှက်နံပါတ် အသစ်ထပ်ရေးပါ"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                    {error?.password_confirmation && <p className="text-danger">{error?.password_confirmation}</p>}
                  </div>
                  

                  <div className="form-group my-2 float-end">
                    <button type="submit" className="loginBtn text-white">
                      {loader && <SmallSpinner />}
                      ပြောင်းမည်
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
