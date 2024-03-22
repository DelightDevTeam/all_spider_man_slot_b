import React, { useState } from "react";
import a1 from "../../../assets/img/categories/a1.png";
import a2 from "../../../assets/img/categories/a2.png";
import a3 from "../../../assets/img/categories/a3.png";
import a4 from "../../../assets/img/categories/a4.png";
import a5 from "../../../assets/img/categories/a5.png";
import a6 from "../../../assets/img/categories/a6.png";
import a7 from "../../../assets/img/categories/a7.png";
import a8 from "../../../assets/img/categories/a8.png";
import BASE_URL from "../../../hooks/baseURL";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import BtnSpinner from "../../Auth/BtnSpinner";
const ArcadeGames = (providers2) => {
  let [url, setUrl] = useState(BASE_URL + "/gameTypeProviders/" + 2);
  let [url1, setUrl1] = useState(BASE_URL + "/gameTypeProviders/" + 3);
  let [url2, setUrl2] = useState(BASE_URL + "/gameTypeProviders/" + 4);
  let { data: play, loading, error } = useFetch(url);
  let { data: play1, loading1, error1 } = useFetch(url1);
  let { data: play2, loading2, error2 } = useFetch(url2);

  let auth = localStorage.getItem("authToken");

  const launchGame = (gameId) => {
    console.log(gameId);
    // setLoader(true);
    //fetch api calling
    fetch(BASE_URL + "/launchGame/" + gameId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Launch Game failed");
        }
        console.log("Launch Game success");
        return response.json();
      })
      .then((data) => {
        // console.log(data.data);
        // setLoader(false);
        window.location.href = data.data;
      })
      .catch((error) => {
        console.error("Launch Game error:", error);
      });
  };
  const arcades = [a1, a2, a3, a4, a5, a6, a7, a8];
  return (
    <div className="px-2 px-sm-4">
      {loading && <BtnSpinner />}
      <div className="row mb-5">
        <div>
          {play2 && (
            <div className="d-flex align-items-sm-center">
              <img
                src={play2.img_url}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
              <h2 className="ms-2">{play2.description}</h2>
            </div>
          )}
        </div>
        {play2.providers &&
          play2.providers.map((slotProvider, index) => {
            return (
              <div key={index} className="col-md-4 col-lg-3 col-6 mb-4">
                {auth && (
                  <Link
                    className="text-decoration-none"
                    to={"/games"}
                    onClick={(e) => {
                      localStorage.removeItem("provider_id");
                      localStorage.removeItem("gameType_id");
                      localStorage.removeItem("title");
                      localStorage.setItem("provider_id", slotProvider.id);
                      localStorage.setItem(
                        "gameType_id",
                        slotProvider.pivot.game_type_id
                      );
                      localStorage.setItem("title", slotProvider.description);
                    }}
                  >
                    <img
                      src={slotProvider.img_url}
                      alt={slotProvider.description}
                      className="img-fluid rounded shadow"
                      style={{ width: "100%", height: "100%" }}
                    />
                    {/* <p className="text-white py-3 text-center">
                      {slotProvider.description}
                    </p> */}
                  </Link>
                )}
                {!auth && (
                  <Link className="text-decoration-none" to={"/login"}>
                    <img
                      src={slotProvider.img_url}
                      alt={slotProvider.description}
                      className="img-fluid rounded shadow"
                      style={{ width: "100%", height: "100%" }}
                    />
                    {/* <p className="text-white py-3 text-center">
                      {slotProvider.description}
                    </p> */}
                  </Link>
                )}
              </div>
            );
          })}
      </div>
      <div className="row mb-5">
        <div>
          {play1 && (
            <div className="d-flex align-items-sm-center">
              <img
                src={play1.img_url}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
              <h2 className="ms-2">{play1.description}</h2>
            </div>
          )}
        </div>
        {play1.providers &&
          play1.providers.map((sportProvider, index) => {
            return (
              <div key={index} className="col-md-4 col-lg-3 col-6 mb-4">
                {auth && (
                  <div
                    onClick={() => launchGame(sportProvider.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={sportProvider.img_url}
                      alt={sportProvider.description}
                      className="img-fluid rounded shadow"
                      style={{ width: "100%", height: "100%" }}
                    />
                    {/* <p className="text-white py-3 text-center">
                      {sportProvider.description}
                    </p> */}
                  </div>
                )}
                {!auth && (
                  <Link className="text-decoration-none" to={"/login"}>
                    <img
                      src={sportProvider.img_url}
                      alt={sportProvider.name_en}
                      className="img-fluid rounded shadow"
                      style={{ width: "100%", height: "100%" }}
                    />
                    {/* <p className="text-white py-3 text-center">
                      {sportProvider.description}
                    </p> */}
                  </Link>
                )}
              </div>
            );
          })}
      </div>
      <div className="row mb-5">
        <div>
          {play && (
            <div className="d-flex align-items-sm-center">
              <img
                src={play.img_url}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
              <h2 className="ms-2">{play.description}</h2>
            </div>
          )}
        </div>
        {play.providers &&
          play.providers.map((liveProvider, index) => {
            return (
              <div key={index} className="col-md-4 col-lg-3 col-6 mb-4">
                {auth && (
                  <div
                    onClick={() => launchGame(liveProvider.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={liveProvider.img_url}
                      alt={liveProvider.description}
                      className="img-fluid rounded shadow"
                      style={{ width: "100%", height: "100%" }}
                    />
                    {/* <p className="text-white py-3 text-center">
                      {liveProvider.description}
                    </p> */}
                  </div>
                )}
                {!auth && (
                  <Link className="text-decoration-none" to={"/login"}>
                    <img
                      src={liveProvider.img_url}
                      alt={liveProvider.name_en}
                      className="img-fluid rounded shadow"
                      style={{ width: "100%", height: "100%" }}
                    />
                    {/* <p className="text-white py-3 text-center">
                      {liveProvider.description}
                    </p> */}
                  </Link>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ArcadeGames;
