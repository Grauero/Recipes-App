import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import EditRecipeModal from './EditRecipeModal';
import Spinner from '../common/Spinner';
import Error from '../common/Error';
import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER
} from '../../queries';

class UserRecipes extends Component {
  state = {
    name: '',
    imageUrl: '',
    category: '',
    description: '',
    modal: false
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleDelete = async (deleteUserRecipe) => {
    const deleteConfirmation = window.confirm('Are you sure you want to delete this recipe?');

    if (deleteConfirmation) {
      await deleteUserRecipe();
    }
  };

  updateCache = (cache, { data: { deleteUserRecipe } }) => {
    const { username } = this.props;
    const { getUserRecipes } = cache.readQuery({
      query: GET_USER_RECIPES,
      variables: { username }
    });

    cache.writeQuery({
      query: GET_USER_RECIPES,
      variables: { username },
      data: {
        getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id)
      }
    });
  };

  closeModal = () => this.setState({ modal: false });

  render() {
    const { username } = this.props;
    const { modal } = this.state;

    return (
      <Query query={GET_USER_RECIPES} variables={{ username }}>
        {(data, loading, error) => {
          if (loading) return <Spinner />;
          if (error) return <Error error={error} />;

          return (
            <ul>
              {modal && (
                <EditRecipeModal closeModal={this.closeModal} handleChange={this.handleChange} />
              )}
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
                      refetchQueries={() => [
                        { query: GET_ALL_RECIPES },
                        { query: GET_CURRENT_USER }
                      ]}
                      update={this.updateCache}
                    >
                      {(deleteUserRecipe, attrs = {}) => (
                        <Fragment>
                          <button
                            type="button"
                            className="button-primary"
                            onClick={() => this.setState({ modal: true })}
                          >
                            Update
                          </button>
                          <p
                            className="delete-button"
                            onClick={() => this.handleDelete(deleteUserRecipe)}
                          >
                            {attrs.loading ? 'deleting...' : 'X'}
                          </p>
                        </Fragment>
                      )}
                    </Mutation>
                  </li>
                ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

UserRecipes.propTypes = {
  username: PropTypes.string.isRequired
};

export default UserRecipes;
