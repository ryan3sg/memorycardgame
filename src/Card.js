import React from "react";

const Card = ({ item, handleSelectedCards, toggled, stopflip, hide }) => (
  <div
    className={`item ${toggled ? "toggled" : ""} ${hide ? "hide" : ""}`}
    onClick={() => !stopflip && handleSelectedCards(item)}
  >
    <div className="face">{toggled ? item.num : ""}</div>
  </div>
);

export default Card;
