import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';

import { getAuthData } from 'authManager';

import environmentVariables from 'config/environmentVariables';

import { handleErrors } from 'helpers/module/apolloClientErrorManager';

const authLink = setContext((_, { headers }) => {
    const authData = getAuthData();
    return {
        headers: {
            ...headers,
            TenantId: authData ? authData.activeTenant : '',
            Authorization: authData ? `Bearer ${authData.jwt}` : '',
        },
    };
});

const errorLink = onError(({graphQLErrors, networkError, response}) => {
    handleErrors(graphQLErrors, networkError, response)
});

const wsLink = new WebSocketLink({
    options: {
        reconnect: true,
        connectionParams: () => {
            const authData = getAuthData();
            return {
                TenantId: authData ? authData.activeTenant : '',
                Authorization: authData ? `Bearer ${authData.jwt}` : '',    
            };
        },
    },
    uri: environmentVariables.serverWebsocketGraphqlAddress,
});

const httpLink = new HttpLink({ uri: environmentVariables.serverGraphqlAddress });

const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(errorLink).concat(link),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
});

export default client;
