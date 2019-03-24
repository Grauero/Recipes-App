import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => (
  <div className="App">
    {/* display only error message on screen */}
    {error && error.message && <p>{error.message.trim().split(':')[1]}</p>}
  </div>
);

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  })
};

Error.defaultProps = {
  error: {}
};

export default Error;
