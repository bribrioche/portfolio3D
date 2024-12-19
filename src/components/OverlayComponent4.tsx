import React, { useEffect, useState } from "react";
import "../styles/OverlayComponentGlobal.css";
import "../styles/OverlayComponent4.css";
import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";

import compass1 from "../assets/Compass.png";
import compass2 from "../assets/Compass_backoffice.png";
import ticTacToe from "../assets/TicTacToe.png";
import portfolio1 from "../assets/portfolio1.png";
import portfolio2 from "../assets/portfolio2.png";
import fishing_game1 from "../assets/fishing_game1.png";
import fishing_game3 from "../assets/fishing_game3.png";
import antigaspi from "../assets/AntiGaspi.png";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaAngular } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaVuejs } from "react-icons/fa";
import { TbBrandThreejs } from "react-icons/tb";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { TbBrandReactNative } from "react-icons/tb";
import { FaNodeJs } from "react-icons/fa";
const woosh_invert = new Audio(require("../assets/sounds/woosh_invert.mp3"));

interface OverlayComponent4Props {
  onShow: () => void;
  onClose: () => void;
}

const OverlayComponent4: React.FC<OverlayComponent4Props> = ({
  onShow,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      onShow(); // Notifier que l'overlay est actif
    }, 200); // Délai de 0.5s

    return () => clearTimeout(timer);
  }, [onShow]);

  const handleClose = () => {
    woosh_invert.volume = 0.05;
    woosh_invert.play();
    setIsVisible(false);
    setTimeout(onClose, 500); // Fermer après la transition
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose(); // Fermer l'overlay si "Échap" est pressé
      }
    };

    // Ajouter un écouteur global pour les événements "keydown"
    window.addEventListener("keydown", handleKeyDown);

    // Nettoyer l'écouteur à la désinstallation du composant
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Exécuté une fois à l'initialisation

  const [selected, setSelected] = useState(0);

  const back = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };

  const next = () => {
    setSelected((selected) => Math.min(selected + 1, 2));
  };

  return (
    <div className={`overlay-container ${isVisible ? "visible" : ""}`}>
      <div className="top">
        <div className="overlay-tab">Projects</div>
        <button
          onClick={handleClose}
          className="overlay-close-button"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
      <div className="overlay-content all-corners">
        <div className="paper">
          <div className="content4">
            <div className="pages">
              <FlippingPages
                direction="right-to-left"
                onSwipeEnd={setSelected}
                selected={selected}
              >
                <div className="page">
                  <div className="left">
                    <div className="title">Compass</div>
                    <div className="images">
                      <img src={compass1} alt="compass" loading="lazy" />
                      <img src={compass2} alt="compass" loading="lazy" />
                    </div>
                  </div>
                  <div className="right">
                    <div className="description">
                      Compass is a serverless web application intended to find
                      the location of salespeople within Solutec offices.
                      Compass backoffice is a web application also intended to
                      update the location of salespeople. This project was
                      carried out in collaboration with a colleague during our
                      intercontract at Solutec and was used by the new
                      consultants.
                    </div>
                    <div className="technos">
                      <div className="techno">
                        <FaAngular className="techno-icon" />
                        <div className="techno-title">Angular</div>
                      </div>
                      <div className="techno">
                        <FaReact className="techno-icon" />
                        <div className="techno-title">React</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page">
                  <div className="left">
                    <div className="title">TicTacToe NewGen</div>
                    <div className="images">
                      <img
                        src={ticTacToe}
                        alt="TicTacToe NewGen"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="description">
                      TicTacToe NewGen is a mobile application of the famous
                      TicTacToe game in an improved version. When placing a
                      fourth pawn, we move the first pawn placed and so on. The
                      game can be played solo against a bot but also with 2, 3
                      or 4 players.
                    </div>
                    <div className="technos">
                      <div className="techno">
                        <FaVuejs className="techno-icon" />
                        <div className="techno-title">VueJs</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page">
                  <div className="left">
                    <div className="title">Portfolio</div>
                    <div className="images">
                      <img
                        src={portfolio2}
                        alt="Portfolio Image"
                        loading="lazy"
                      />
                      <img
                        src={portfolio1}
                        alt="Portfolio Image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="description">
                      Here is my new portfolio. It is intended to show you my
                      skills through my projects and professional experiences.
                    </div>
                    <div className="technos">
                      <div className="techno">
                        <FaReact className="techno-icon" />
                        <div className="techno-title">React</div>
                      </div>
                      <div className="techno">
                        <TbBrandThreejs className="techno-icon" />
                        <div className="techno-title">TreeJS</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page">
                  <div className="left">
                    <div className="title">Fishing Game</div>
                    <div className="images">
                      <img
                        src={fishing_game1}
                        alt="Fishing Game Image"
                        loading="lazy"
                      />
                      <img
                        src={fishing_game3}
                        alt="Fishing Game Image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="description">
                      This project is a web browser video game. The goal of the
                      game is to successfully catch all types of fish and
                      collect all the trophies. This application was developed
                      in vanilla with only ThreeJS for 3D.
                    </div>
                    <div className="technos">
                      <div className="techno">
                        <FaHtml5 className="techno-icon" />
                        <div className="techno-title">HTML</div>
                      </div>
                      <div className="techno">
                        <FaCss3Alt className="techno-icon" />
                        <div className="techno-title">CSS</div>
                      </div>
                      <div className="techno">
                        <IoLogoJavascript className="techno-icon" />
                        <div className="techno-title">Javascript</div>
                      </div>
                      <div className="techno">
                        <TbBrandThreejs className="techno-icon" />
                        <div className="techno-title">TreeJS</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page">
                  <div className="left">
                    <div className="title">AntiGaspi</div>
                    <div className="images">
                      <img
                        src={antigaspi}
                        alt="Antigaspi Image"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="right">
                    <div className="description">
                      This project is a mobile application, still under
                      development, which aims to combat food waste by explaining
                      to consumers that certain products can be consumed even if
                      the optimal use-by date has passed.
                    </div>
                    <div className="technos">
                      <div className="techno">
                        <TbBrandReactNative className="techno-icon" />
                        <div className="techno-title">React Native</div>
                      </div>
                      <div className="techno">
                        <FaNodeJs className="techno-icon" />
                        <div className="techno-title">NodeJS</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FlippingPages>
            </div>
            <div className="buttons">
              <button onClick={back} disabled={selected === 0}>
                <FaLongArrowAltLeft
                  className={selected != 0 ? "icon" : "disabled-icon"}
                />
              </button>
              <button onClick={next} disabled={selected === 2}>
                <FaLongArrowAltRight
                  className={selected != 2 ? "icon" : "disabled-icon"}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="paper2"></div>
      </div>
    </div>
  );
};

export default OverlayComponent4;
