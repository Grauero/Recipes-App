import React from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from '../../queries';

function isAuth(session) {
  return session && session.getCurrentUser;
}

const withAuth = conditionFunc => Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading) return null;

      return conditionFunc(data) ? <Component {...props} /> : <Redirect to="/" />;
    }}
  </Query>
);

export default withAuth;
export { isAuth };
