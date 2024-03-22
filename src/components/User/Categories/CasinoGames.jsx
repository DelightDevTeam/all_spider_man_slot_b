import React, { useState } from "react";
import BtnSpinner from "../../Auth/BtnSpinner";
import { Link, Outlet } from "react-router-dom";
import BASE_URL from "../../../hooks/baseURL";

const CasinoGames = ({ providers, loading }) => {

  let [loader, setLoader] = useState(false);
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
    <div className="px-2 px-sm-4 pb-5 mb-5 pt-4">
      {loading && <BtnSpinner />}
      <div className="row">
        {providers &&
          providers.map((provider, index) => {
            return (
              <div className="col-md-3 col-6 mb-4" key={index}>
                {provider.p_code !== "PR" && (
                  <>
                  {auth && (
                      <Link className="text-decoration-none" onClick={() => launchGame(provider.id)} style={{ "cursor" : "pointer" }}>
                        <img src={provider.img_url} className='categoryGame' alt="" />
                        <p className='text-white mt-2 text-center'>
                          {provider.description}
                        </p>
                      </Link>
                  )}
                  {!auth && (
                      <Link className="text-decoration-none" to={'/login'} style={{ "cursor" : "pointer" }}>
                          <img src={provider.img_url} className='categoryGame' alt="" />
                          <p className='text-white mt-2 text-center'>
                          {provider.description}
                          </p>
                      </Link>
                  )}

                  </>
                )}
                {provider.p_code === "PR" && (
                  <>
                    <Link className="text-decoration-none text-white text-center" to={'/games'} onClick={(e)=>{
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
                    <p className="mt-2 text-center">{provider.description}</p>
                    </Link>
                  </>
                )}

              </div>
            );
          })}
      </div>
      <Outlet />
    </div>
  );
};

export default CasinoGames;
