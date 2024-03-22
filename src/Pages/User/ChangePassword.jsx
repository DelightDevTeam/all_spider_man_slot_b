import React, { useEffect, useState } from "react";
import "../../assets/css/navbar.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";

const ChangePassword = () => {
  let auth = localStorage.getItem("authToken");
  let navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errMessage, setErrMessage] = useState();
  if (!auth) {
    useEffect(() => {
      navigate("/");
    }, [navigate]);
  }

  let handle = async (e) => {
    e.preventDefault();

    try {
      let data = { currentPassword, password };
      // console.log(data);
      let response = await fetch(BASE_URL + "/changePassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      let user = await response.json();
      setUser(user.data);
      console.log("Password Changed Successfully.");
      setCurrentPassword("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      if (error.message == "Old Passowrd is incorrect") {
        setErrMessage(error.message);
      }
    }
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
              <div className="container my-4">
                <form onSubmit={handle}>
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
                  </div>

                  <div className="form-group mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="လျှို့ဝှက်နံပါတ်အသစ်"
                      name="password"
                      id="new_password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  {errMessage && <p className="text-danger">{errMessage}</p>}

                  <div className="form-group my-2 float-end">
                    <button type="submit" className="loginBtn text-white">
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
