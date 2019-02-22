import React, { Fragment, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Navbar from './components/layouts/Navbar';
import Spinner from './components/common/Spinner';
import withSession from './components/utils/withSession';
import './index.css';

const Search = lazy(() => import('./components/recipe/Search'));
const Signin = lazy(() => import('./components/auth/Signin'));
const Signup = lazy(() => import('./components/auth/Signup'));
const AddRecipe = lazy(() => import('./components/recipe/AddRecipe'));
const RecipePage = lazy(() => import('./components/recipe/RecipePage'));
const Profile = lazy(() => import('./components/profile/Profile'));

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
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

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
        <Route path="/recipes/:_id" component={RecipePage} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

Root.propTypes = {
  refetch: PropTypes.func.isRequired,
  session: PropTypes.instanceOf(Object).isRequired
};

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Suspense fallback={<div className="fallback"><Spinner /></div>}>
      <RootWithSession />
    </Suspense>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
