import React, { createContext, useContext, useState } from 'react';

const RomanNumeralContext = createContext();

// eslint-disable-next-line react/prop-types
const RomanNumeralProvider = ({ children }) => {
  const [isRomanNumeral, setRomanNumeral] = useState(false);

  const value = { isRomanNumeral, setRomanNumeral };
  return <RomanNumeralContext.Provider value={value}>{children}</RomanNumeralContext.Provider>;
};

const withRomanNumerals = () => {
  const context = useContext(RomanNumeralContext);
  if (context === undefined) {
    throw new Error('withRomanNumerals must be used inside the RomanNumeralProvider');
  }

  return context;
};

export { RomanNumeralProvider, withRomanNumerals };
