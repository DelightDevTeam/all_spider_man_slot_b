import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";
import BtnSpinner from "../../components/Auth/BtnSpinner";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";

export default function GameHistory() {
  const { authenticated, setAuthenticated } = useAuthContext();

  const navigate = useNavigate();

  if (!authenticated) {
    navigate("/login");
  }

  let [url, setUrl] = useState(BASE_URL + "/wallet/currentWallet");

  const form = useForm({
    mode: "onTouched",
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const [wallet, setWallet] = useState(null);
  const [providers, setProviders] = useState(null);

  const { wallets, setWallets } = useAuthContext();

  const [user, setUser] = useState();
  // console.log(wallet);
  // console.log(user);
  useEffect(() => {
    setWallets(wallet);
  }, [wallet]);

  const [amount, setAmount] = useState("");
  const [gameHistory, setGameHistory] = useState();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [banks, setBank] = useState();
  const [authUsera, setAuthUser] = useState();
  // console.log(banks);
  console.log(authUsera);
  const getProvider = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/providers", { headers })
      .then((response) => {
        setProviders(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getList = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/wallet/currentWallet", { headers })
      .then((response) => setWallet(response.data.data));
  };

  const getBank = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/bank/all", { headers })
      .then((response) => {
        setBank(response.data.data);
      })
      .catch((e) => console.log(e));
  };

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
    getList();
    getProvider();
    getBank();
  }, []);

  useEffect(() => {
    getAuthUser();
  }, [wallet]);

  const gameLog = (gameLogData) => {
    console.log(gameLogData.fromDate);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(
        BASE_URL +
          `/game-log?fromDate=${gameLogData.fromDate}&toDate=${gameLogData.toDate}`,
        { headers }
      )
      .then((response) => {
        console.log(response);
        setGameHistory(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  console.log(gameHistory);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid my-5">
        <h3 className="text-center mb-4">Game History</h3>
        <div className="row">
          <div className="col-md-9 col-sm-6 mx-auto">
            <div className="bg-transparent border border-1 py-3 px-3 rounded-3 shadow">
              {/* <h5 className="mb-4">Game History</h5> */}
              <form onSubmit={handleSubmit(gameLog)}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="amount" className="form-label">
                        မှ
                      </label>
                      <input
                        type="date"
                        placeholder="ငွေပမာဏ ထည့်ပါ"
                        className={`form-control ${
                          errors.fromDate && "border-2 border-danger"
                        }`}
                        {...register("fromDate", {
                          required: "fromDate is Required.",
                        })}
                      />
                      <div className="error text-danger">
                        {errors.fromDate?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="acc_name" className="form-label">
                        သို့
                      </label>
                      <input
                        type="date"
                        id="toDate"
                        placeholder="ဘဏ်အ‌ကောင့်အမည် ထည့်ပါ"
                        className={`form-control ${
                          errors.toDate && "border-2 border-danger"
                        }`}
                        {...register("toDate", {
                          required: "toDate  is Required.",
                        })}
                      />
                      <div className="error text-danger">
                        {errors.toDate?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-4 pt-2">
                    <button className="btn btn-red">တင်သွင်းမည်</button>
                  </div>
                </div>
              </form>
              {gameHistory && (
                <table className="table table-borderless mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Game</th>
                      <th scope="col">Total Bet</th>
                      <th scope="col">Winlose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameHistory &&
                      gameHistory.map((history, index) => (
                        <tr key={index} className="p-2">
                          <th>{history.game_name}</th>
                          <th>{history.total_bet}</th>
                          <td>{history.winlose}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
