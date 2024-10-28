import React from 'react';
import PortfolioBox from './components/PortfolioBox'; // Assurez-vous que le chemin est correct

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PortfolioBox />
    </div>
  );
};

export default App;
