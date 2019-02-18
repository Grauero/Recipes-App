import React from 'react';
import PropTypes from 'prop-types';

import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';

const Profile = ({ session }) => (
  <div className="App">
    <UserInfo session={session} />
    <UserRecipes username={session.getCurrentUser.username} />
  </div>
);

Profile.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Profile;
