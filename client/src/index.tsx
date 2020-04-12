import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createGlobalStyle } from 'styled-components';

import * as serviceWorker from './serviceWorker';
import { Routes } from './Routes';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const GlobalStyles = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: rgb(255, 254, 252);
    color: #0d0d0d;
    font-size: 16px;
    max-width: 1000px;
    margin: 0 auto;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    & div {
      box-sizing: border-box;

      :focus {
        outline: none;
      }
    }

    a {
      text-decoration: none;
    }

    #root {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }

`;

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Routes />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
