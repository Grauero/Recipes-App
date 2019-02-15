import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchItem = ({ _id, name, likes }) => (
  <li>
    <Link to={`/recipes/${_id}`}>
      <h4>{name}</h4>
    </Link>
    <p>Likes: {likes}</p>
  </li>
);

SearchItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired
};

export default SearchItem;
