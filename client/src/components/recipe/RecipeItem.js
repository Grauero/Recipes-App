import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeItem = ({ _id, name, category }) => (
  <li>
    <Link to={`/recipes/${_id}`}>
      <h4>{name}</h4>
    </Link>
    <p>
      <strong>{category}</strong>
    </p>
  </li>
);

RecipeItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default RecipeItem;
