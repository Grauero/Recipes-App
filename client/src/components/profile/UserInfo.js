import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const formatDate = (date) => {
  const newDate = new Date(date).toLocaleDateString('en-US');
  const newTime = new Date(date).toLocaleTimeString('en-US');

  return `${newDate} at ${newTime}`;
};

const UserInfo = ({ session }) => (
  <div>
    <h3>User Info</h3>
    <p>Username: {session.getCurrentUser.username}</p>
    <p>Email: {session.getCurrentUser.email}</p>
    <p>Join Date: {formatDate(session.getCurrentUser.joinDate)}</p>
    <ul>
      <h3>{session.getCurrentUser.username}'s Favorites</h3>
      {session.getCurrentUser.favorites.map(favorite => (
        <li key={favorite._id}>
          <Link to={`/recipes/${favorite._id}`}>
            <p>{favorite.name}</p>
          </Link>
        </li>
      ))}
      {!session.getCurrentUser.favorites.length && (
        <p>
          <strong>You have no favorites currently.</strong>
        </p>
      )}
    </ul>
  </div>
);

UserInfo.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default UserInfo;
