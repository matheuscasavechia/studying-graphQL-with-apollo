import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {ApolloProvider} from '@apollo/react-hooks';

import Client from './apollo-client';
import Home from './src/screens/Home';
import {name as appName} from './app.json';

const App = () => (
  <>
    <StatusBar barStyle="light-content" />
    <ApolloProvider client={Client}>
      <Home />
    </ApolloProvider>
  </>
);

AppRegistry.registerComponent(appName, () => App);
