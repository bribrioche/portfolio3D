import React, { useEffect, useState } from "react";
import "../styles/OverlayComponentGlobal.css";
import "../styles/OverlayComponent3.css";
import { Timeline } from "flowbite-react";
import { RiComputerLine } from "react-icons/ri";
import biyaku from "../assets/biyaku.png";
import retail_vr from "../assets/retail_vr.png";
import ronceray from "../assets/mjc_ronceray.png";
import coclico from "../assets/coclico.png";
import solutec from "../assets/solutec.png";

const woosh_invert = new Audio(require("../assets/sounds/woosh_invert.mp3"));

interface OverlayComponent3Props {
  onShow: () => void;
  onClose: () => void;
}

const OverlayComponent3: React.FC<OverlayComponent3Props> = ({
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

  return (
    <div className={`overlay-container ${isVisible ? "visible" : ""}`}>
      <div className="top">
        <div className="overlay-tab-3">Experiences</div>
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
          <div className="content3">
            <Timeline horizontal>
              <Timeline.Item>
                <Timeline.Point icon={RiComputerLine} />
                <Timeline.Content>
                  <Timeline.Time>2018</Timeline.Time>
                  <div className="image">
                    <img
                      src={coclico}
                      alt="coclico logo"
                      style={{
                        alignSelf: "center",
                        textAlign: "center",
                        maxWidth: "150px",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <Timeline.Title>
                    Intership / Coclico, Le Mans, France
                  </Timeline.Title>
                  <Timeline.Body>
                    Personalized menu project on a website already present.
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Point icon={RiComputerLine} />
                <Timeline.Content>
                  <Timeline.Time>2019</Timeline.Time>
                  <div className="image">
                    <img
                      src={ronceray}
                      alt="mjc ronceray logo"
                      style={{
                        alignSelf: "center",
                        textAlign: "center",
                        maxWidth: "150px",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <Timeline.Title>
                    Internship / MJC Ronceray, Le Mans, France
                  </Timeline.Title>
                  <Timeline.Body>
                    Application project for the cultural season.
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Point icon={RiComputerLine} />
                <Timeline.Content>
                  <Timeline.Time>2021-2022</Timeline.Time>
                  <div className="image">
                    <img
                      src={biyaku}
                      alt="Biyaku logo"
                      style={{
                        alignSelf: "center",
                        textAlign: "center",
                        maxWidth: "150px",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <Timeline.Title>
                    Self-employed / Biyaku, Le Mans, France
                  </Timeline.Title>
                  <Timeline.Body>
                    Graphic design, mockup and web design.
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Point icon={RiComputerLine} />
                <Timeline.Content>
                  <Timeline.Time>March 2022 to June 2023</Timeline.Time>
                  <div className="image">
                    <img
                      src={retail_vr}
                      alt="retail VR logo"
                      style={{
                        alignSelf: "center",
                        textAlign: "center",
                        maxWidth: "150px",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <Timeline.Title>RetailVR, Nantes, France</Timeline.Title>
                  <Timeline.Body>
                    Development of a 3D environment creation software (Unity,
                    Gitlab, Jira)
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
              <Timeline.Item>
                <Timeline.Point icon={RiComputerLine} />
                <Timeline.Content>
                  <Timeline.Time>July 2023 to Now</Timeline.Time>
                  <div className="image">
                    <img
                      src={solutec}
                      alt="Solutec logo"
                      style={{
                        alignSelf: "center",
                        textAlign: "center",
                        maxWidth: "150px",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <Timeline.Title>Solutec, Paris, France</Timeline.Title>
                  <Timeline.Body>
                    SNCF - Fullstack Development (Angular, NodeJS, Gitlab,
                    Jenkins)
                    <br />
                    One of the most important international Bank - Application
                    Manager (Bash, Mainframe, SQL, Jira)
                  </Timeline.Body>
                </Timeline.Content>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
        <div className="paper2"></div>
      </div>
    </div>
  );
};

export default OverlayComponent3;
