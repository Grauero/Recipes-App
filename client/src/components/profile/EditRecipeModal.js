import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { UPDATE_USER_RECIPE } from '../../queries';

const EditRecipeModal = ({
  recipe, closeModal, handleChange, handleSubmit
}) => (
  <Mutation
    mutation={UPDATE_USER_RECIPE}
    variables={{
      _id: recipe._id,
      name: recipe.name,
      imageUrl: recipe.imageUrl,
      category: recipe.category,
      description: recipe.description
    }}
  >
    {updateUserRecipe => (
      <div className="modal modal-open">
        <div className="modal-inner">
          <div className="modal-content">
            <form className="modal-content-inner" onSubmit={e => handleSubmit(e, updateUserRecipe)}>
              <h4>Edit Recipe</h4>

              <label htmlFor="name">Recipe Name</label>
              <input type="text" name="name" value={recipe.name} onChange={handleChange} />

              <label htmlFor="imageUrl">Recipe Image</label>
              <input type="text" name="imageUrl" value={recipe.imageUrl} onChange={handleChange} />

              <label htmlFor="category">Category of Recipe</label>
              <select name="category" value={recipe.category} onChange={handleChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>

              <label htmlFor="description">Recipe Description</label>
              <input
                type="text"
                name="description"
                value={recipe.description}
                onChange={handleChange}
              />

              <hr />
              <div className="modal-buttons">
                <button type="submit" className="button-primary">
                  Update
                </button>
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </Mutation>
);

EditRecipeModal.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    modal: PropTypes.bool.isRequired
  }).isRequired
};

export default EditRecipeModal;
