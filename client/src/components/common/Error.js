import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => (
  <div className="App">
    <h1>An Error Occurred. Try to restart site.</h1>
    {error && <p>{error.message}</p>}
  </div>
);

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  }).isRequired
};

export default Error;
