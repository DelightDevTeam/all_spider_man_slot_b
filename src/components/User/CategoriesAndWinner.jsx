import React, { useState } from "react";
import Categories from "./Categories";
import SlotGames from "./Categories/SlotGames";
import CasinoGames from "./Categories/CasinoGames";
import SportGames from "./Categories/SportGames";
import BASE_URL from "../../hooks/baseURL";
import useFetch from "../../hooks/useFetch";
import HomeHeroGames from "./Categories/HomeHeroGames";
import ArcadeGames from "./Categories/ArcadeGames";

const CategoriesAndWinner = ({ activeCategory, setActiveCategory }) => {
  let [url, setUrl] = useState(BASE_URL + "/gameTypeProviders/" + 2);
  let [url1, setUrl1] = useState(BASE_URL + "/gameTypeProviders/" + 3);
  let [url2, setUrl2] = useState(BASE_URL + "/gameTypeProviders/" + 4);
  let { data: play, loading, error } = useFetch(url);
  let { data: play1, loading1, error1 } = useFetch(url1);
  let { data: play2, loading2, error2 } = useFetch(url2);
  // console.log(play.providers);

  return (
    <div className="categoriesAndWinner">
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        link={url}
      />
      <div
        style={{ overflowY: "scroll", overflowX: "hidden" }}
        className="mt-sm-5"
      >
        {activeCategory === "all" && (
          <ArcadeGames name2="SLOT" loading={loading2} />
        )}
        {activeCategory === "hotgame" && <HomeHeroGames />}
        {activeCategory === "LIVE-CASINO" && (
          <CasinoGames providers={play.providers} loading={loading} />
        )}
        {activeCategory === "SPORTBOOK" && (
          <SportGames providers={play1.providers} loading={loading1} />
        )}
        {activeCategory === "SLOTS" && (
          <SlotGames providers={play2.providers} loading={loading2} />
        )}
      </div>
    </div>
  );
};

export default CategoriesAndWinner;
