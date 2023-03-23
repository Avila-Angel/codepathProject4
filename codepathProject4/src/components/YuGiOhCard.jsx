import { useState } from "react";

function YuGiOhCard({ name, type, image, atk, def, level, attribute }) {
  const [bannedList, setBannedList] = useState([]);

  return (
    <div className="container">
      <div className="cardInfoSection">
        <div className="upperBio">
          <h3 id="cardName">{name}</h3>
          <div className="typeOuterContainer">
            {type.map((type) => {
              return (
                <button className="typeContainer" onClick={addBanList}>
                  <p className="type">{type}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mainBio">
          <div className="bioImage">
            <img id="image" src={image} width={225} height={225}></img>
          </div>
          <div className="bioBio">
            <div className="attackSection">
              <p className="header">Attack</p>
              <p id="attack">{atk}</p>
            </div>
            <div className="defenseSection">
              <p className="header">Defense</p>
              <p id="defense">{def}</p>
            </div>
            <div className="defenseSection">
              <p className="header">Level</p>
              <p id="defense">{level}</p>
            </div>
            <div className="defenseSection">
              <p className="header">Attribute</p>
              <p id="defense">{attribute}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bannedTypes">
        <h3 id="bannedHeader">Banned Types</h3>
      </div>
    </div>
  );
}
export default YuGiOhCard;
