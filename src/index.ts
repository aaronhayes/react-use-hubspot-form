import { useState, useEffect } from 'react';
import useScript from './useScript';

interface UseHubSpotFormProps {
  portalId: string;
  formId: string;
  target: string;
}

interface UseHubSpotFormResponse {
  loaded: boolean;
  error: boolean;
  formCreated: boolean;
}

const useHubSpotForm = ({
  portalId,
  formId,
  target
}: UseHubSpotFormProps): UseHubSpotFormResponse => {
  const [loaded, error] = useScript('//js.hsforms.net/forms/v2.js');
  const [formCreated, setFormCreated] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (loaded && window.hbspt && !formCreated) {
      // @ts-ignore
      window.hbspt.forms.create({
        portalId,
        formId,
        target
      });

      setFormCreated(true);
    }
  }, [loaded, formCreated, setFormCreated]);

  return { loaded, formCreated, error };
};

export default useHubSpotForm;
