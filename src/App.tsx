import React, { useEffect, useState } from "react";
import PortfolioBox from "./components/PortfolioBox";
import "./App.css";

const App: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  const handleResize = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container">
      {isPortrait && (
        <div className="overlay">
          <div className="overlay-message">
            Please rotate your device to landscape mode or choose a large screen
            for a more immersive experience.
          </div>
        </div>
      )}
      <PortfolioBox />
    </div>
  );
};

export default App;
