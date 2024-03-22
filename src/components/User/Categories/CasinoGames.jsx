import React, { useState } from "react";
import BtnSpinner from "../../Auth/BtnSpinner";
import { Link, Outlet } from "react-router-dom";
import BASE_URL from "../../../hooks/baseURL";
import useFetch from "../../../hooks/useFetch";

const CasinoGames = () => {
  const [url, setUrl] = useState(BASE_URL + '/allGameProducts');
  const { data: games, loading } = useFetch(url);
  const casinos = games[1]?.products;

  let auth = localStorage.getItem("token");

  const launchGame = (productId, gameType) => {
    if(!auth){
      navigate('/login');
    }else{
      let gameData = {
        productId: productId,
        gameType: gameType,
      }
  
      fetch(BASE_URL + "/game/Seamless/LaunchGame", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(gameData)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Launch Game failed");
          }
          console.log("Launch Game success");
          return response.json();
        })
        .then((data) => {
          window.open(data.Url, '_blank');
        })
        .catch((error) => {
          console.error("Launch Game error:", error);
        });
    }

  };

  return (
    <div className="container mt-3">
      {loading && <BtnSpinner />}
      <div className="mb-4">
        <h3>Live Casino</h3>
        <div className="row">
          {casinos && casinos.map((game, index) => (
            <div className="col-md-2 col-4 mb-3" key={index}>
              <Link
                key={game.id}
                className='col-4 col-md-4 col-lg-3 col-xl-2 mb-1 mb-sm-4 px-1 py-0 mx-0'
                onClick={(e) => {
                  e.preventDefault();
                  launchGame(game.code, game.pivot.game_type_id)}
                }
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
