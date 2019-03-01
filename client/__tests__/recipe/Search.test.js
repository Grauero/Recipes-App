import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

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
        searchRecipes: [
          {
            _id: '_id',
            name: 'name',
            likes: 0
          }
        ]
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

it('handles input change and updates state value', async () => {
  const expectedState = { searchResults: [{ _id: '_id', name: 'name', likes: 0 }] };
  const event = { target: { value: 'searchTerm' }, persist: jest.fn() };

  component.find('input').simulate('change', event);
  await wait(0);

  expect(event.persist).toHaveBeenCalled();
  expect(event.persist).toHaveBeenCalledTimes(1);
  expect(component.state()).not.toEqual(initialState);
  expect(component.state()).toEqual(expectedState);
});
