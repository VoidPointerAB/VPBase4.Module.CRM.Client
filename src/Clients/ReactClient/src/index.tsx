import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';

import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ApolloProvider } from 'react-apollo';

import environmentVariables from 'config/environmentVariables';

import client from './apolloClient';
import App from './App';

import './i18n';
import './include/module';

import './include/module/crm';

const app = (
    <ApolloProvider client={client}>
        <Helmet>
            <title>{environmentVariables.applicationTabTitle}</title>
        </Helmet>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root') as HTMLElement);
