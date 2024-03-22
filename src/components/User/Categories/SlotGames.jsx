import React from "react";
import BtnSpinner from "../../Auth/BtnSpinner";
import { Link } from "react-router-dom";

const SlotGames = ({ providers, loading }) => {
  console.log(providers);
  return (
    <div className="px-2 px-sm-4 pb-5 mb-5 pt-4">
      {loading && <BtnSpinner />}
      <div className="row">
        
        {providers &&
          providers.map((provider, index) => {
            return (
              <div className="col-md-3 col-6 mb-4" key={index}>
                <Link to={'/games'} onClick={(e)=>{
                  localStorage.removeItem("provider_id");
                  localStorage.removeItem("gameType_id");
                  localStorage.removeItem("title");
                  localStorage.setItem("provider_id", provider.id);
                  localStorage.setItem("gameType_id", provider.pivot.game_type_id);
                  localStorage.setItem("title", provider.description);
                }}>
                <img
                  key={index}
                  className="categoryGame"
                  src={provider.img_url}
                />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SlotGames;
