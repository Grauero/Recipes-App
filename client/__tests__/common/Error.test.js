import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Error from '../../src/components/common/Error';

it('matches snapshot when error message is provided', () => {
  const props = { error: { message: 'error-message' } };
  const component = shallow(<Error {...props} />);

  expect(toJSON(component)).toMatchSnapshot();
});

it('matches snapshot when error message is NOT provided', () => {
  const component = shallow(<Error />);

  expect(toJSON(component)).toMatchSnapshot();
});
