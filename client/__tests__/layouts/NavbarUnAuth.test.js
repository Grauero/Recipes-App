import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import NavbarUnAuth from '../../src/components/layouts/NavbarUnAuth';

let component;

beforeEach(() => {
  component = shallow(<NavbarUnAuth />);
});

afterEach(() => {
  component.unmount();
});

it('matches snapshot', () => {
  expect(toJSON(component)).toMatchSnapshot();
});
