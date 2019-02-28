import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';

import Search from '../../src/components/recipe/Search';
import { SEARCH_RECIPES } from '../../src/queries';

const initialState = { searchResults: [] };

const mocks = [
  {
    request: {
      query: SEARCH_RECIPES,
      variables: { searchTerm: 'searchTerm' }
    },
    result: {
      data: {
        searchRecipes: { result: 'result' }
      }
    }
  }
];
let component;
let wrapper;

beforeEach(() => {
  wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    </MockedProvider>
  );

  component = wrapper.find(Search);
  component.setState(initialState);
});

afterEach(() => {
  wrapper.unmount();
});

it('matches snapshot', () => {
  expect(toJSON(component)).toMatchSnapshot();
});
