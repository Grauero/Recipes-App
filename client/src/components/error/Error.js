import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => <p>{error.message}</p>;

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  }).isRequired
};

export default Error;
