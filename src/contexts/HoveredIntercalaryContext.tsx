import React, { createContext, useState, ReactNode } from 'react';

interface HoveredContextProps {
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}

export const HoveredIntercalaryContext = createContext<HoveredContextProps>({
  hoveredId: null,
  setHoveredId: () => {},
});

export const HoveredIntercalaryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <HoveredIntercalaryContext.Provider value={{ hoveredId, setHoveredId }}>
      {children}
    </HoveredIntercalaryContext.Provider>
  );
};
