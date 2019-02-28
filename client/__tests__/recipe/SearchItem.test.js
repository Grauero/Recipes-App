import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import SearchItem from '../../src/components/recipe/SearchItem';

it('matches snapshot', () => {
  const props = { _id: 'id', name: 'name', likes: 0 };
  const component = shallow(<SearchItem {...props} />);

  expect(toJSON(component)).toMatchSnapshot();
});
