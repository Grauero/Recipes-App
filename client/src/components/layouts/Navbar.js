import React from 'react';
import PropTypes from 'prop-types';

import NavbarAuth from './NavbarAuth';
import NavbarUnAuth from './NavbarUnAuth';

const Navbar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
  </nav>
);

Navbar.propTypes = {
  session: PropTypes.instanceOf(Object).isRequired
};

export default Navbar;
