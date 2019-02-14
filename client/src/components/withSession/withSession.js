import React from 'react';
import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from '../../queries';

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ loading, refetch }) => {
      if (loading) return null;

      return <Component {...props} refetch={refetch} />;
    }}
  </Query>
);

export default withSession;
