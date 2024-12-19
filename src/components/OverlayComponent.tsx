import React, { useEffect, useState } from "react";
import "../styles/OverlayComponentGlobal.css";
import photo from "../assets/photo.png";
import scotch1 from "../assets/scotch1.png";
import scotch2 from "../assets/scotch2.png";

interface OverlayComponentProps {
  onShow: () => void;
  onClose: () => void;
}

const OverlayComponent: React.FC<OverlayComponentProps> = ({
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
        <div className="overlay-tab">About Me</div>
        <button
          onClick={handleClose}
          className="overlay-close-button"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
      <div className="overlay-content">
        <div className="paper">
          <div className="content">
            <div className="photo-section">
              <div className="photo-wrapper">
                <img src={photo} alt="Photo" className="photo" />
                <img
                  src={scotch2}
                  alt="Scotch bas"
                  className="scotch scotch-top"
                />
                <img
                  src={scotch1}
                  alt="Scotch haut"
                  className="scotch scotch-bottom"
                />
              </div>
            </div>
            <div className="wrapper-left-section">
              <div className="smallPaper">
                <div className="text-section">
                  <ul className="list-disc pl-5">
                    <li>Bryan Guillot</li>
                    <li>25 years old</li>
                    <li>Paris</li>
                    <li>FullStack Developer</li>
                    <ul className="list-disc pl-5">
                      <li>Angular</li>
                      <li>VueJs</li>
                      <li>React</li>
                      <li>NodeJs</li>
                      <li>MongoDB</li>
                      <li>MariaDB/PostgreSQL</li>
                    </ul>
                    <li>Hobbies :</li>
                    <ul className="list-disc pl-5">
                      <li>BasketBall</li>
                      <li>Japan</li>
                      <li>Drawing</li>
                      <li>Music</li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>

            {/* <div className="text-section">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel
              voluptatem, eaque architecto sint blanditiis repellat sequi error,
              dolores dolorem molestias nesciunt deleniti et, fugit ab culpa
              nobis! Eligendi, qui sequi.
            </div> */}
          </div>
        </div>
        <div className="paper2"></div>
      </div>
    </div>
  );
};

export default OverlayComponent;
