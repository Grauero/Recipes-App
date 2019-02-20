import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER
} from '../../queries';

const handleDelete = async (deleteUserRecipe) => {
  const deleteConfirmation = window.confirm('Are you sure you want to delete this recipe?');

  if (deleteConfirmation) {
    await deleteUserRecipe();
  }
};

const UserRecipes = ({ username }) => (
  <Query query={GET_USER_RECIPES} variables={{ username }}>
    {(data, loading, error) => {
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>;

      return (
        <ul>
          {data.data && data.data.getUserRecipes && data.data.getUserRecipes.length !== 0 && (
            <h3>Your Recipes</h3>
          )}

          {data.data.getUserRecipes
            && data.data.getUserRecipes.map(recipe => (
              <li key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>
                  <p>{recipe.name}</p>
                </Link>
                <p style={{ marginBottom: '0' }}>{recipe.likes}</p>
                <Mutation
                  mutation={DELETE_USER_RECIPE}
                  variables={{ _id: recipe._id }}
                  refetchQueries={() => [{ query: GET_ALL_RECIPES }, { query: GET_CURRENT_USER }]}
                  update={(cache, { data: { deleteUserRecipe } }) => {
                    const { getUserRecipes } = cache.readQuery({
                      query: GET_USER_RECIPES,
                      variables: { username }
                    });

                    cache.writeQuery({
                      query: GET_USER_RECIPES,
                      variables: { username },
                      data: {
                        getUserRecipes: getUserRecipes.filter(
                          recipe => recipe._id !== deleteUserRecipe._id
                        )
                      }
                    });
                  }}
                >
                  {(deleteUserRecipe, attrs = {}) => (
                    <p className="delete-button" onClick={() => handleDelete(deleteUserRecipe)}>
                      {attrs.loading ? 'deleting...' : 'X'}
                    </p>
                  )}
                </Mutation>
              </li>
            ))}
        </ul>
      );
    }}
  </Query>
);

UserRecipes.propTypes = {
  username: PropTypes.string.isRequired
};

export default UserRecipes;
