import { useEffect, useState } from 'react';
import { HubSpotFormLocale } from './hubspot-form-locale.enum';
import HubspotProvider, {
  HubspotContextProps,
  useHubspotContext
} from './HubspotProvider';

interface WindowWithHubspot extends Window {
  // TODO improve typings
  readonly hbspt?: any;
  readonly hubspot?: any;
}

interface UseHubSpotFormResponse {
  readonly loaded: boolean;
  readonly error: boolean;
  readonly formCreated: boolean;
}

/**
 * Inputs based on HubSpot docs: https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
 */
export interface UseHubSpotFormProps {
  readonly portalId: string;
  readonly formId: string;
  readonly target: string;
  /**
   * URL to which the form will redirect upon a successful form completion. Cannot be used with inlineMessage.
   */
  readonly redirectUrl?: string;
  /**
   * Inline message to display in place of the form upon a successful form completion. Cannot be used with redirectUrl.
   */
  readonly inlineMessage?: string;
  /**
   * ID of the landing page on which the form exists. This must be the content ID of a landing page built in HubSpot.
   */
  readonly pageId?: string;
  /**
   * CSS string specific to validation error messages. Empty string == no style.
   */
  readonly cssRequired?: string;
  /**
   * CSS class that will be applied to the form.
   */
  readonly cssClass?: string;
  /**
   * CSS class that will be applied to the submit input instead of the default .hs-button.primary.large.
   */
  readonly submitButtonClass?: string;
  /**
   * CSS class that will be applied to inputs with validation errors instead of the default .invalid.error.
   */
  readonly errorClass?: string;
  /**
   * CSS class that will be applied to error messages instead of the default .hs-error-msgs.inputs-list.
   */
  readonly errorMessageClass?: string;
  /**
   * Show all errors at once inside a single container. Defaults to true, otherwise only shows the first error for each field.
   */
  readonly groupErrors?: string;
  /**
   * Locale for the form, used to customize language for form errors and the date picker. See Add internationalized error messages below.
   */
  readonly locale?: HubSpotFormLocale;
  /**
   * Custom translations
   * An object containing additional translation languages or to override field labels or messages for existing languages. See Customize internationalization below.
   * Reference: https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options
   */
  readonly translations?: any;
  /**
   * Array of domains to block in email inputs.
   */
  readonly blockedDomains?: string[];
  /**
   * When embedding the same form on the same page twice, provide this Id for each identical form embed. The Id value is arbitrary, so long as it is not the same between forms.
   */
  readonly formInstanceId?: string;
  /**
   * Callback that executes before the form builds, takes form configuration object as single argument: onBeforeFormInit(ctx)
   */
  // tslint:disable-next-line:no-mixed-interface
  readonly onBeforeFormInit?: () => any;
  /**
   * Callback that executes after form is built, placed in the DOM, and validation has been initialized.
   * This is perfect for any logic that needs to execute when the form is on the page.
   * Takes the jQuery form object as the argument: onFormReady($form)
   */
  readonly onFormReady?: ($form?: any) => any;
  /**
   * Callback that executes after form is validated, just before the data is actually sent.
   * This is for any logic that needs to execute during the submit.
   * Any changes will not be validated. Takes the jQuery form object as the argument: onFormSubmit($form)
   */
  readonly onFormSubmit?: ($form?: any) => any;
  /**
   * Callback the data is actually sent.
   * This allows you to perform an action when the submission is fully complete, such as displaying a confirmation or thank you message.
   */
  readonly onFormSubmitted?: () => any;
}

export const useHubspotForm = (
  props: Readonly<UseHubSpotFormProps>
): UseHubSpotFormResponse => {
  const { loaded, error } = useHubspotContext();
  const [formCreated, setFormCreated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window) {
      const windowWithHubspot: WindowWithHubspot = window;
      if (loaded && windowWithHubspot.hbspt && !formCreated) {
        windowWithHubspot.hbspt.forms.create(props);
        setFormCreated(true);
      }
    }
  }, [loaded, formCreated, setFormCreated]);

  return { loaded, formCreated, error };
};

export {
  HubspotProvider,
  useHubspotContext,
  HubspotContextProps,
  HubSpotFormLocale
};
