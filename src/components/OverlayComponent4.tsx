import React, { useEffect, useState } from "react";
import "../styles/OverlayComponentGlobal.css";
import "../styles/OverlayComponent4.css";
import { FlippingPages } from "flipping-pages";
import "flipping-pages/dist/style.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

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
    setIsVisible(false);
    setTimeout(onClose, 500); // Fermer après la transition
  };

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
                  <div className="left">Page 1 left</div>
                  <div className="right">Page 1 right</div>
                </div>
                <div className="page">
                  <div className="left">Page 2 left</div>
                  <div className="right">Page 2 right</div>
                </div>
                <div className="page">
                  <div className="left">Page 3 left</div>
                  <div className="right">Page 3 right</div>
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
