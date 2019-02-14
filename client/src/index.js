import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import withSession from './components/withSession/withSession';
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: true
  },
  request: (operation) => {
    const token = localStorage.getItem('token');

    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
    }
  }
});

const Root = ({ refetch }) => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route
        path="/signin"
        render={() => {
          <Signin refetch={refetch} />;
        }}
      />
      <Route
        path="/signup"
        render={() => {
          <Signup refetch={refetch} />;
        }}
      />
      <Redirect to="/" />
    </Switch>
  </Router>
);

Root.propTypes = { refetch: PropTypes.func.isRequired };

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
