import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import NavbarAuth from '../../src/components/layouts/NavbarAuth';

const props = { session: { getCurrentUser: { username: 'username' } } };
let component;

beforeEach(() => {
  component = shallow(<NavbarAuth {...props} />);
});

afterEach(() => {
  component.unmount();
});

it('matches snapshot', () => {
  expect(toJSON(component)).toMatchSnapshot();
});

it('renders username', () => {
  const heading = component.find('h4');

  expect(heading.text()).toBe(`Welcome, ${props.session.getCurrentUser.username}`);
});
