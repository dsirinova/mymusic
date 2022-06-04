import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./favorite.css";
export default function Favorites() {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    APIKit.get("me/favorites").then(function (response) {
      setFavorites(response.data.items);
      console.log(response.data.items)
    });
  }, []);

  const navigate = useNavigate();

  const favoriteFavorites = (id) => {
    navigate("/favorite", { state: { id: id } });
  };

return (
  <div className="screen-container">
    <div className="library-body">
      {favorites?.map((favorite) => (
        <div
          className="favorite-card"
          key={favorite.id}
          onClick={() => favoriteFavorites(favorite.id)}
        >
          <img
            src={favorite?.images[0]?.url}
            className="favorite-image"
            alt="favorite-Art"
          />
          <p className="favorite-title">{favorite.name}</p>
          <p className="favorite-subtitle">{favorite.tracks.total} Songs</p>
          <div className="favorite-fade">
            <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}