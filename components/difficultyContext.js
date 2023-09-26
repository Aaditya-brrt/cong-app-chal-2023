import React, { createContext, useContext, useState } from 'react';

const DifficultyContext = createContext();

export const DifficultyProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState(4);

  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  );
};

export const useDifficulty = () => {
  return useContext(DifficultyContext);
};