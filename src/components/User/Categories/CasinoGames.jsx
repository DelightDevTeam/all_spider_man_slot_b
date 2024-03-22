import React, { useState } from "react";
import BtnSpinner from "../../Auth/BtnSpinner";
import { Link, Outlet } from "react-router-dom";
import BASE_URL from "../../../hooks/baseURL";
import useFetch from "../../../hooks/useFetch";

const CasinoGames = () => {
  const [url, setUrl] = useState(BASE_URL + '/allGameProducts');
  const { data: games, loading } = useFetch(url);
  const casinos = games[1]?.products;
  console.log(games);

  let auth = localStorage.getItem('authToken');

  const launchGame = (gameId) => {
    setLoader(true);
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
      setLoader(false);
      window.location.href = data.data;
    })
    .catch((error) => {
      console.error("Launch Game error:", error);
    });
  }

  return (
    <div className="container mt-3">
      {loading && <BtnSpinner />}
      <div className="mb-4">
        <h3>Live Casino</h3>
        <div className="row">
          {casinos && casinos.map((game, index) => (
            <div className="col-md-2 col-4 mb-3 mx-0 px-1" key={index}>
              <Link
                key={game.id}
                className=''
                onClick={() => launchGame(game?.code, game.code)}
              >
                <img
                  className={`img-fluid rounded-3 shadow gameImg w-100 h-auto`}
                  src={game.imgUrl}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CasinoGames;
