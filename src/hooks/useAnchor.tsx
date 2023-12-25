import { createContext, useState } from 'react';

export interface Anchor {
  anchor: string;
  updateAnchor: (value: string) => void;
}

export const AnchorContext = createContext<Anchor>(null as any);

export const AnchorContextProvider = ({ children }: any) => {
  const [anchor, setAnchor] = useState('');
  const updateAnchor = (newValue: string) => {
    setAnchor(newValue);
  };
  const contextValue = {
    anchor,
    updateAnchor,
  };

  return (
    <AnchorContext.Provider value={contextValue}>
      {children}
    </AnchorContext.Provider>
  );
};
