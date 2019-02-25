import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Navbar from '../../src/components/layouts/Navbar';

const props = { session: { getCurrentUser: { username: 'username' } } };
let component;

beforeEach(() => {
  component = shallow(<Navbar {...props} />);
});

afterEach(() => {
  component.unmount();
});

it('renders <NavbarAuth /> component when session.getCurrentUser is provided', () => {
  expect(toJSON(component)).toMatchSnapshot();
});

it('renders <NavbarUnAuth /> component when session.getCurrentUser is NOT provided', () => {
  component = shallow(<Navbar session={{}} />);

  expect(toJSON(component)).toMatchSnapshot();
});
