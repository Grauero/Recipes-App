import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => <p>{error.message}</p>;

Error.propTypes = {
  error: PropTypes.instanceOf(Object).isRequired
};

export default Error;
