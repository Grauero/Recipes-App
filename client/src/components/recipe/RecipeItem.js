import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecipeItem = ({
  _id, imageUrl, name, category
}) => (
  <li className="card" style={{ background: `url(${imageUrl}) no-repeat center center / cover` }}>
    <span className={category}>{category}</span>
    <div className="card-">
      <Link to={`/recipes/${_id}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </li>
);

RecipeItem.propTypes = {
  _id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default RecipeItem;
