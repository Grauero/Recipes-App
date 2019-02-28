import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import RecipeItem from '../../src/components/recipe/RecipeItem';

it('matches snapshot', () => {
  const props = {
    _id: '_id',
    imageUrl: 'imageUrl',
    name: 'name',
    category: 'category'
  };
  const component = shallow(<RecipeItem {...props} />);

  expect(toJSON(component)).toMatchSnapshot();
});
