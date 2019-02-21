import React, { Component } from 'react';
import { Query } from 'react-apollo';
import posed from 'react-pose';

import RecipeItem from './recipe/RecipeItem';
import Spinner from './common/Spinner';
import Error from './common/Error';
import { GET_ALL_RECIPES } from '../queries';
import './App.css';

const RecipeList = posed.ul({
  shown: {
    x: '0%',
    staggerChildren: 100
  },
  hidden: {
    x: '-100%'
  }
});

class App extends Component {
  state = {
    on: false
  };

  componentDidMount() {
    setTimeout(this.slideIn, 200);
  }

  slideIn = () => {
    this.setState({ on: !this.state.on });
  };

  render() {
    return (
      <div className="App">
        <h1 className="main-title">Find Your Favorite Recipes</h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <Error error={error} />;

            const { on } = this.state;

            return (
              <RecipeList className="cards" pose={on ? 'shown' : 'hidden'}>
                {data.getAllRecipes.map(recipe => (
                  <RecipeItem key={recipe._id} {...recipe} />
                ))}
              </RecipeList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
