import React from 'react';
import { Query } from 'react-apollo';

import { GET_ALL_RECIPES } from '../queries';
import './App.css';

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ loading, error }) => {
        if (loading) return <div>loading</div>;
        if (error) return <div>error</div>;

        return <p>123</p>;
      }}
    </Query>
  </div>
);

export default App;
