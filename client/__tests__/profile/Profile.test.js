import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Profile } from '../../src/components/profile/Profile';

const props = { session: { getCurrentUser: { username: 'username', favorites: [] } } };
const component = shallow(<Profile {...props} />);

it('matches snapshot', () => {
  expect(toJSON(component)).toMatchSnapshot();
});
