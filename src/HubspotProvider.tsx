import React, { createContext, useContext } from 'react';
import useScript from './useScript';

export interface HubspotContextProps {
  loaded: boolean; // Is Hubspot script loaded
  error: boolean; // Is Hubspot failed to loaded
}

export const HubspotContext = createContext<HubspotContextProps>({
  loaded: false,
  error: false
});

export const useHubspotContext = () => useContext(HubspotContext);

const HubspotProvider = ({ children }) => {
  // Attach hubspot script to the head of the document
  const [loaded, error] = useScript('https://js.hsforms.net/forms/v2.js');

  return (
    <HubspotContext.Provider value={{ loaded, error }}>
      {children}
    </HubspotContext.Provider>
  );
};

export default HubspotProvider;
