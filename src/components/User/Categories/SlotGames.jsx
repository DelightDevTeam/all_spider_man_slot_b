import React, { useState } from "react";
import BtnSpinner from "../../Auth/BtnSpinner";
import { Link } from "react-router-dom";
import BASE_URL from "../../../hooks/baseURL";
import useFetch from "../../../hooks/useFetch";

const SlotGames = () => {
  const [url, setUrl] = useState(BASE_URL + '/allGameProducts');
  const { data: games, loading } = useFetch(url);
  const slots = games[0]?.products;
  console.log(games);

  return (
    <div className="container mt-3">
      {loading && <BtnSpinner />}
      <div className="mb-4">
        <h3>Slots</h3>
        <div className="row">
          {slots && slots.map((game, index) => (
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

export default SlotGames;
