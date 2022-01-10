import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { getAccessToken, setAccessToken } from './utils/accessToken';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ChakraProvider as UIProvider } from '@node-graphql-jwt/ui';

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken)
            operation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            });
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch(`${process.env.REACT_APP_BACKEND_URI}/refresh_token`, {
          method: 'POST',
          credentials: 'include',
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn('Refresh token is invalid');
        console.error(err);

        // Can logout user on the server side
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: `${process.env.REACT_APP_BACKEND_URI}/graphql`,
      credentials: 'include',
    }),
  ]),
  cache: new InMemoryCache(),
});

export const AppRoot = ({ children }) => (
  <ApolloProvider client={client}>
    <UIProvider>
      <React.StrictMode>{children}</React.StrictMode>
    </UIProvider>
  </ApolloProvider>
);
