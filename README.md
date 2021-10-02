# React Use HubSpot Form Embed

[![npm (scoped)](https://img.shields.io/npm/v/@aaronhayes/react-use-hubspot-form?style=flat-square)](https://www.npmjs.com/package/@aaronhayes/react-use-hubspot-form)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@aaronhayes/react-use-hubspot-form?style=flat-square)](https://bundlephobia.com/result?p=@aaronhayes/react-use-hubspot-form)
![License](https://img.shields.io/npm/l/@aaronhayes/react-use-hubspot-form?style=flat-square)

Embed HubSpot forms into your React components using hooks! Works with Create React App, Gatsby and other platforms.

## Install

```
$ npm install --save @aaronhayes/react-use-hubspot-form
```

```
$ yarn add @aaronhayes/react-use-hubspot-form
```

## Getting Started

Wrap your application with `HubspotProvider`. This will add [Hubspot script](https://js.hsforms.net/forms/v2.js) to the head of your document.

```TypeScript
import React from 'react';

import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form';

const MyApp = () => (
    <HubspotProvider>
        <MyPage />
    </HubspotProvider>
)

```

## Usage

```TypeScript
import React from 'react';

import { useHubspotForm } from '@aaronhayes/react-use-hubspot-form';

const MyPage = () => {
    const { loaded, error, formCreated } = useHubspotForm({
        portalId: 'XXXXXXX',
        formId: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
        target: '#my-hubspot-form'
    });

    return (
        <div>
            <h1>Embed Form Below</h1>
            <div id="my-hubspot-form"></div>
        </div>
    )
}

```

## Breaking Changes

### 2.0.0

- Introduction of the `HubspotProvider` component. This needs to be included in your App for `useHubspotForm` to work.

## Support

If you feel like sending some sats to aaron@zbd.gg my [Lightning Address](https://zbd.gg/aaron/) it would be much appreciated.
