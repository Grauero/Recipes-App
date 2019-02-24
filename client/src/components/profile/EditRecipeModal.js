import React from 'react';
import PropTypes from 'prop-types';

const EditRecipeModal = ({ closeModal, handleChange }) => (
  <div className="modal modal-open">
    <div className="modal-inner">
      <div className="modal-content">
        <form className="modal-content-inner">
          <h4>Edit Recipe</h4>

          <label htmlFor="name">Recipe Name</label>
          <input type="text" name="name" onChange={handleChange} />

          <label htmlFor="imageUrl">Recipe Image</label>
          <input type="text" name="imageUrl" onChange={handleChange} />

          <label htmlFor="category">Category of Recipe</label>
          <select name="category" onChange={handleChange}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>

          <label htmlFor="description">Recipe Description</label>
          <input type="text" name="description" onChange={handleChange} />

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
);

EditRecipeModal.propTypes = {
  handleChange: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default EditRecipeModal;
