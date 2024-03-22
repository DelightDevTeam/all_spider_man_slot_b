import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../hooks/baseURL";
import SmallSpinner from "../spinner/SmallSpinner";

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('')

  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  
  if(auth){
    useEffect(() => {
      navigate("/"); // Navigate to the home route
    }, [navigate]);
  }

  const login = (e) =>{
    e.preventDefault();
    setLoading(true);
    const loginData = {
        user_name: name,
        password: password
    };
    
    fetch(BASE_URL + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(async response => {
        if (!response.ok) {
          setLoading(false);
          let errorData;
          try {
            errorData = await response.json();
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
    
          if (response.status === 422) {
            setErrMsg("");
            setError(errorData.errors);
            // console.error(`Login failed with status ${response.status}:`, errorData);
          }else if (response.status === 401) {
            // console.error(`Login failed with status ${response.status}:`, errorData);
            setError("");
            setErrMsg(errorData.message)
          }else{
            console.error(`Unexpected error with status ${response.status}`);
          }
    
          throw new Error('Login Failed');
        }
    
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
        // console.log(data);
        if (data.data.token) {
          localStorage.setItem('token', data.data.token);
          navigate('/');
        } else {
          throw new Error('Token not found in response');
        }
      })
      .catch(error => {
        // console.error('Login error:', error);
      });
    }


  return (
    <>
        <div className="text-white homeBody">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-4">
                <div className="border border-1 rounded-3 shadow-lg p-4 loginCard">
                  <div className="text-center mb-4 me-4">
                    <Link to={"/"}>
                      <img className="logo" src={logo} />
                    </Link>
                  </div>

                  <h5 className="text-center mb-4">
                    Welcome To Spider-Man Slot
                  </h5>
                  <div className="card-body">
                      {errMsg && (
                        <div className="alert alert-danger text-white">
                          *{errMsg}
                        </div>
                      )}
                      <form role="form" className="text-start" onSubmit={login}>
                          <div className="mb-3">
                              <label htmlFor="name" className="form-label">Name</label>
                              <input type="text" id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Username" />
                              {error.user_name && (
                                  <div className="text-danger">*{error.user_name}</div>
                              )}
                          </div>
                          
                          <div className="mb-3">
                              <label htmlFor="password" className="form-label">Password</label>
                              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                              {error.password && (
                                  <span className="text-danger">*{error.password}</span>
                              )}
                          </div>
                          <div className="text-center">
                              <button type="submit" className="btn btn-light w-100 my-4 mb-2 py-2">
                                {loading && <SmallSpinner />}
                                Sign in
                              </button>
                          </div>
                      </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
