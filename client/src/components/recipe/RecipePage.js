import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import LikeRecipe from './LikeRecipe';
import Spinner from '../common/Spinner';
import Error from '../common/Error';
import { GET_RECIPE } from '../../queries';

const RecipePage = ({ match }) => {
  const { _id } = match.params;

  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <Error error={error} />;

        const {
          name, imageUrl, category, description, likes, username
        } = data.getRecipe;

        return (
          <div className="App">
            <div
              className="recipe-image"
              style={{
                background: `url(${imageUrl}) no-repeat center center / cover`
              }}
            />

            <div className="recipe">
              <div className="recipe-header">
                <h2 className="recipe-name">
                  <strong>{name}</strong>
                </h2>
                <h5>
                  <strong>{category}</strong>
                </h5>
                <p>
                  Created by <strong>{username}</strong>
                </p>
                <p>
                  {likes}{' '}
                  <span role="img" aria-label="heart">
                    ❤️
                  </span>
                </p>
              </div>

              <blockquote className="recipe-description">{description}</blockquote>

              <h3 className="recipe-instructions__title">Instructions</h3>
              <div
                className="recipe-instructions"
                dangerouslySetInnerHTML={{ __html: data.getRecipe.instructions }}
              />
              <LikeRecipe _id={_id} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

RecipePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default withRouter(RecipePage);
export { RecipePage };
