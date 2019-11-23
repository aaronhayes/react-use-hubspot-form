# React Use HubSpot Form Embed

[![npm (scoped)](https://img.shields.io/npm/v/@aaronhayes/react-use-hubspot-form?style=flat-square)](https://www.npmjs.com/package/@aaronhayes/react-use-hubspot-form)
[![Greenkeeper badge](https://badges.greenkeeper.io/aaronhayes/react-use-hubspot-form.svg?style=flat-square)](https://greenkeeper.io/)

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

## Usage

```TypeScript
import React from 'react';

import useHubspotForm from '@aaronhayes/react-use-hubspot-form';

const MyPage = () => {
    const { loaded, error, formCreated } = useScrollSpy();

    return (
        <div>
            <h1>Embed Form Below</h1>
            <div id="my-hubspot-form" />
        </div>
    )
}

```
