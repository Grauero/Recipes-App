import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const AnimatedListItem = posed.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 }
});

const RecipeItem = ({
  _id, imageUrl, name, category
}) => (
  <AnimatedListItem
    className="card"
    style={{ background: `url(${imageUrl}) no-repeat center center / cover` }}
  >
    <span className={category}>{category}</span>
    <div className="card-text">
      <Link to={`/recipes/${_id}`}>
        <h4>{name}</h4>
      </Link>
    </div>
  </AnimatedListItem>
);

RecipeItem.propTypes = {
  _id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default RecipeItem;
