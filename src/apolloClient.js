import { ApolloClient, InMemoryCache,split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';


const WS_URL='wss://web-production-7e40.up.railway.app/'
const HTTP_URL='https://web-production-7e40.up.railway.app/'

const httpLink=createUploadLink({
  uri: HTTP_URL,
  credentials: 'include'
})

const wsLink = new WebSocketLink({
    uri: WS_URL,
    options: {
        reconnect: true,
        lazy:true
    }
  });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});