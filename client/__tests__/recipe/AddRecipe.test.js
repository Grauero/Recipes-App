import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';

import { AddRecipe } from '../../src/components/recipe/AddRecipe';
import { ADD_RECIPE, GET_USER_RECIPES } from '../../src/queries';

const initialState = {
  name: '',
  imageUrl: '',
  instructions: '',
  category: 'Breakfast',
  description: '',
  username: ''
};
const props = {
  history: { push: jest.fn() },
  session: { getCurrentUser: { username: 'username' } }
};

const mocks = [
  {
    request: {
      query: ADD_RECIPE,
      variables: {
        name: 'name',
        imageUrl: 'imageUrl',
        instructions: 'instructions',
        category: 'category',
        description: 'description',
        username: 'username'
      }
    },
    result: {
      data: {
        addRecipe: {
          _id: '_id',
          name: 'name',
          imageUrl: 'image',
          category: 'category',
          description: 'description',
          instructions: 'instructions',
          createdDate: 'date',
          likes: 0,
          username: 'user'
        }
      }
    }
  },
  {
    request: {
      query: GET_USER_RECIPES,
      variables: { username: 'username' }
    },
    result: {
      data: {
        getUserRecipes: {
          name: 'name'
        }
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
        <AddRecipe {...props} />
      </BrowserRouter>
    </MockedProvider>
  );

  component = wrapper.find(AddRecipe);
  component.setState(initialState);
});

afterEach(() => {
  wrapper.unmount();
});

it('handles inputs change and updates state', () => {
  const expectedState = {
    name: '',
    imageUrl: 'value',
    instructions: '',
    category: 'value',
    description: 'value',
    username: 'value'
  };
  const username = component.find('input').at(0);
  const imageUrl = component.find('input').at(1);
  const category = component.find('select').at(0);
  const description = component.find('input').at(2);

  username.simulate('change', { target: { name: 'username', value: 'value' } });
  imageUrl.simulate('change', { target: { name: 'imageUrl', value: 'value' } });
  category.simulate('change', { target: { name: 'category', value: 'value' } });
  description.simulate('change', { target: { name: 'description', value: 'value' } });

  expect(component.state()).toEqual(expectedState);
});

it('clears state and redirects to "/" when user submits form', async () => {
  component.setState({
    name: 'name',
    imageUrl: 'imageUrl',
    instructions: 'instructions',
    category: 'category',
    description: 'description',
    username: 'username'
  });

  component.find('form').simulate('submit');
  await wait(0);

  expect(component.state()).toEqual(initialState);
  expect(props.history.push).toHaveBeenCalled();
  expect(props.history.push).toHaveBeenCalledWith('/');
});

it('disables submit button if mutation is loading', async () => {
  wrapper = mount(
    <MockedProvider mocks={[]} addTypename={false}>
      <BrowserRouter>
        <AddRecipe {...props} />
      </BrowserRouter>
    </MockedProvider>
  );

  component = wrapper.find(AddRecipe);
  component.find('form').simulate('submit');

  wait(0);

  expect(component.find('button').html()).toBe(
    '<button disabled="" type="submit" class="button-primary" style="margin-top: 1em;">Submit</button>'
  );
});

it('disables submit button if inputs are empty', async () => {
  expect(component.find('button').html()).toBe(
    '<button disabled="" type="submit" class="button-primary" style="margin-top: 1em;">Submit</button>'
  );
});
