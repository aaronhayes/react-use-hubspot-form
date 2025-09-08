import React, { createContext, ReactElement, useContext } from 'react';
import useScript from './useScript';

export interface HubspotContextProps {
  readonly loaded: boolean; // Is Hubspot script loaded
  readonly error: boolean; // Is Hubspot failed to loaded
  readonly scriptUrl?: string; // The URL of the loaded script
}

export const HubspotContext = createContext<HubspotContextProps>({
  loaded: false,
  error: false,
  scriptUrl: undefined
});

export const useHubspotContext = () => useContext(HubspotContext);

interface HubspotProviderProps {
  readonly async?: boolean;
  readonly addToHead?: boolean;
  readonly children: React.ReactNode;
  readonly hubspotDestinationUrl?: string;
  readonly region?: string;
}

const HubspotProvider = ({
  async,
  addToHead,
  children,
  hubspotDestinationUrl,
  region
}: HubspotProviderProps): ReactElement => {
  // Check if we're nested inside another HubspotProvider
  const parentContext = useContext(HubspotContext);
  
  // Determine the script URL based on provided props or parent context
  const getScriptUrl = (): string => {
    if (hubspotDestinationUrl) {
      return hubspotDestinationUrl;
    }
    if (region) {
      return `https://js-${region}.hsforms.net/forms/v2.js`;
    }
    // If nested and parent has a URL, inherit it
    if (parentContext.scriptUrl) {
      return parentContext.scriptUrl;
    }
    return 'https://js.hsforms.net/forms/v2.js';
  };

  const scriptUrl = getScriptUrl();

  // Only load script if not already loaded by parent or if URL is different
  const shouldLoadScript = !parentContext.loaded || parentContext.scriptUrl !== scriptUrl;
  
  // Attach hubspot script to the document
  const [loaded, error] = useScript(
    shouldLoadScript ? scriptUrl : null,
    async,
    addToHead
  );

  // Use parent's loaded state if we're not loading a new script
  const finalLoaded = shouldLoadScript ? loaded : parentContext.loaded;
  const finalError = shouldLoadScript ? error : parentContext.error;

  return (
    <HubspotContext.Provider value={{ loaded: finalLoaded, error: finalError, scriptUrl }}>
      {children}
    </HubspotContext.Provider>
  );
};

export default HubspotProvider;
