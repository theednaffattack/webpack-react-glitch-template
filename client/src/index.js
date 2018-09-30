import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import App from './components/App';

// const ApolloApp = () => (
//   <ApolloProvider client={client}>
//   </ApolloProvider>
// );
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
)