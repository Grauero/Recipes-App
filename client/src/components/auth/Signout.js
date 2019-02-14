import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

function handleSignout(client, history) {
  localStorage.setItem('token', '');
  client.resetStore();
  history.push('/');
}

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => handleSignout(client, history)}>
        Signout
      </button>
    )}
  </ApolloConsumer>
);

Signout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Signout);
