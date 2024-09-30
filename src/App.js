import React, { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "./App.css";
import flipSound from "./sounds/flip.m4a";

const images = [
  require("./imageledrem/pok1.png"),
  require("./imageledrem/salaban.png"),
  
  require("./imageledrem/03.png"),
  require("./imageledrem/04.png"),
  require("./imageledrem/05.png"),
  require("./imageledrem/06.png"),
  require("./imageledrem/07.png"),
  require("./imageledrem/08.png"),
  require("./imageledrem/09.png"),
 
  
];

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (e) => {
    setIsOpen(true);
  };

  return (
    <div className="App">
      {/* {!isOpen && (
        <div className="overlay">
          <div id="partA"></div>
          <div className="btn" onClick={handleButtonClick} id="btn">
            OPEN
          </div>
        </div>
      )} */}
      <EbookSlider />
    </div>
  );
}

const EbookSlider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const flipAudio = useRef(new Audio(flipSound));

  const progressPercentage = ((currentPage + 1) / images.length) * 100;

  const handleFlip = (e) => {
    flipAudio.current.play();
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 d-flex justify-content-center">
          <HTMLFlipBook
            width={window.innerWidth < 768 ? 350 : 432}
            height={window.innerWidth < 768 ? 480 : 768}
            maxShadowOpacity={0.5}
            showCover={true}
            onChangeState={handleFlip}
            onFlip={(e) => setCurrentPage(e.data)}
            className="flipbook"
            flipSound={flipAudio}
          >
            {images.map((image, index) => (
              <img
                src={image}
                key={index}
                alt={`Page ${index + 1}`}
                style={{ width: "100%", height: "100%" }}
              />
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col-12 col-md-8">
          <div className="progress-bar-container">
            <div className="progress-bar-background">
              <div
                className="progress-bar"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
