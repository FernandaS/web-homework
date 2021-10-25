import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes';
import { ApolloProvider } from '@apollo/client';
import { client } from './network/apollo-client';

import './/i18/i18n';

ReactDOM.render(
  <div data-app-init="">
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </div>,
  document.getElementById('react-app')
);
