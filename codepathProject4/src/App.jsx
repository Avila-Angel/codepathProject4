import { useEffect, useState } from "react";
import "./App.css";
import cardIcon from "./assets/cardIcon.png";
import duelDiskIcon from "./assets/duelDiskIcon.png";
import YuGiOhCard from "./components/YuGiOhCard";
import axios from "axios";

function App() {
  const [card, setCard] = useState([]);
  const [index, setIndex] = useState(Math.floor(Math.random() * 20));
  const [generatedCard, setGeneratedCard] = useState({
    name: "Fenrir",
    type: ["Effect Monster", "Beast"],
    image:
      "https://ygoprodeck.com/cdn-cgi/image/format=auto,width=313/https://images.ygoprodeck.com/images/cards/218704.jpg",
    attack: 1400,
    defense: 1200,
    level: 4,
    attribute: "Water",
  });
  const [bannedList, setBannedList] = useState([]);

  async function fetchData() {
    for (let i = 1; i < 20; i++) {
      const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${i}`;
      const response = await axios.get(url);
      let cardData = response.data;
      let type = cardData.type;
      let newType = type.map((data) => {
        return data.type.name;
      });
      let cardObject = {
        name: cardData.name,
        type: newType,
        image: cardData.sprites.other.dream_world.front_default,
        attack: cardData.attack,
        defense: cardData.defense,
        level: cardData.level,
        attribute: cardData.attribute,
      };
      setCard((card) => [...card, cardObject]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function generateCard() {
    setIndex(Math.floor(Math.random() * 20));
    setGeneratedCard(card[index]);
  }

  function checkIfBanned(array) {
    for (let i = 0; i < array.length; i++) {
      if (bannedList.includes(array[i])) {
        return false;
      }
    }
    return true;
  }
  return (
    <div className="App">
      <div className="upperSection">
        <div className="textSection">
          <h1 id="mainTitle">It's Time to Du-Du-Du-Du DUEL!</h1>
          <button id="generate" onClick={generateCard}>
            <p id="generateText">Generate Card</p>
            <img id="random" src={cardIcon}></img>
          </button>
          <img id="duelDiskIcon" src={duelDiskIcon} width={250}></img>
        </div>
      </div>
      <div className="container">
        {generatedCard.type && checkIfBanned(generatedCard.type) ? (
          <div className="cardBioSection">
            <div className="upperBio">
              <h3 id="cardName">{generatedCard.name}</h3>
              <div className="typeOuterContainer">
                {generatedCard.type.map((type) => {
                  return (
                    <div
                      className="typeContainer"
                      value={type}
                      onClick={() => {
                        if (!bannedList.includes(type)) {
                          setBannedList((bannedTypes) => [
                            ...bannedTypes,
                            type,
                          ]);
                        }
                      }}
                    >
                      <p className="type" value={type}>
                        {type}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mainBio">
              <div className="bioImage">
                <img
                  id="image"
                  src={generatedCard.image}
                  width={225}
                  height={250}
                ></img>
              </div>
              <div className="bioBio">
                <div className="attackSection">
                  <p className="header">Attack</p>
                  <p id="attack">{generatedCard.attack}</p>
                </div>
                <div className="defenseSection">
                  <p className="header">Defense</p>
                  <p id="defense">{generatedCard.defense}</p>
                </div>
                <div className="attackSection">
                  <p className="header">Level</p>
                  <p id="attack">{generatedCard.level}</p>
                </div>
                <div className="defenseSection">
                  <p className="header">Attribute</p>
                  <p id="defense">{generatedCard.attribute}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          generateCard()
        )}
        ;
        <div className="bannedTypes">
          <h3 id="bannedHeader">Banned Types</h3>
          <ul>
            {bannedList &&
              bannedList.map((banned) => {
                return <li className="bannedC">{banned}</li>;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
