import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import jwtManager from '../services/jwtManager';
import { refreshAccessToken } from './AuthProvider';

const authLink = setContext((_, { headers }) => {
    const { getToken } = jwtManager();
    const access_token = getToken();
    return {
        headers: {
            ...headers,
            authorization: access_token ? `Bearer ${access_token}` : ""
        }
    };
});
  
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            switch (extensions && extensions.code) {
                case 'UNAUTHENTICATED':
                    const oldHeaders = operation.getContext().headers;
                    operation.setContext({
                    headers: {
                        ...oldHeaders,
                        authorization: refreshAccessToken(),
                    },
                    });
                    return forward(operation);
                default:
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            }
        })
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});
  
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API_URL,
    credentials: 'include'
});
  
const createApolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, httpLink]),

});

export default createApolloClient;