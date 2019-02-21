import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import CKEditor from 'react-ckeditor-component';

import Error from '../error/Error';
import withAuth, { isAuth } from '../utils/withAuth';
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';

const initialState = {
  name: '',
  imageUrl: '',
  instructions: '',
  category: 'Breakfast',
  description: '',
  username: ''
};

class AddRecipe extends Component {
  state = { ...initialState };

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  clearState = () => this.setState({ ...initialState });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleEditorChange = (e) => {
    const newContent = e.editor.getData();
    this.setState({ instructions: newContent });
  };

  handleSubmit = async (e, addRecipe) => {
    e.preventDefault();

    await addRecipe();

    this.clearState();
    this.props.history.push('/');
  };

  validateForm = () => {
    const {
      name, imageUrl, instructions, category, description
    } = this.state;
    const isInvalid = !name || !imageUrl || !instructions || !category || !description;

    return isInvalid;
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes]
      }
    });
  };

  render() {
    const {
      name, imageUrl, instructions, category, description, username
    } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{
          name,
          imageUrl,
          instructions,
          category,
          description,
          username
        }}
        refetchQueries={() => [{ query: GET_USER_RECIPES, variables: { username } }]}
        update={this.updateCache}
      >
        {(addRecipe, { loading, error }) => (
          <div className="App">
            <h2 className="App">Add Recipe</h2>
            <form className="form" onSubmit={e => this.handleSubmit(e, addRecipe)}>
              <input
                type="text"
                name="name"
                placeholder="Recipe Name"
                value={name}
                onChange={this.handleChange}
              />

              <input
                type="text"
                name="imageUrl"
                placeholder="Recipe Image"
                value={imageUrl}
                onChange={this.handleChange}
              />

              <select name="category" value={category} onChange={this.handleChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>

              <input
                type="text"
                name="description"
                placeholder="Add description"
                value={description}
                onChange={this.handleChange}
              />

              <label htmlFor="instructions">Add Instructions</label>
              <CKEditor
                name="instructions"
                content={instructions}
                events={{ change: this.handleEditorChange }}
              />
              {/* <textarea
                name="instructions"
                placeholder="Add instructions"
                value={instructions}
                onChange={this.handleChange}
              /> */}

              <button
                disabled={loading || this.validateForm()}
                type="submit"
                className="button-primary"
              >
                Submit
              </button>
              {error && <Error error={error} />}
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

AddRecipe.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withAuth(isAuth)(withRouter(AddRecipe));
