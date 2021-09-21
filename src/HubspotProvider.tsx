import React, { createContext, useContext } from 'react';
import useScript from './useScript';

export interface HubspotContextProps {
  readonly loaded: boolean; // Is Hubspot script loaded
  readonly error: boolean; // Is Hubspot failed to loaded
}

export const HubspotContext = createContext<HubspotContextProps>({
  loaded: false,
  error: false
});

export const useHubspotContext = () => useContext(HubspotContext);

interface HubspotProviderProps {
  readonly async?: boolean;
  readonly addToHead?: boolean;
  readonly children: React.ReactNode;
}

const HubspotProvider = ({
  async,
  addToHead,
  children
}: HubspotProviderProps) => {
  // Attach hubspot script to the document
  const [loaded, error] = useScript(
    'https://js.hsforms.net/forms/v2.js',
    async,
    addToHead
  );

  return (
    <HubspotContext.Provider value={{ loaded, error }}>
      {children}
    </HubspotContext.Provider>
  );
};

export default HubspotProvider;
