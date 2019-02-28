import React from 'react';
import { mount } from 'enzyme';
// import { BrowserRouter } from 'react-router-dom';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';

import { LikeRecipe } from '../../src/components/recipe/LikeRecipe';
import { LIKE_RECIPE, UNLIKE_RECIPE } from '../../src/queries';

const initialState = { username: '', liked: false };
const props = {
  session: {
    getCurrentUser: { username: 'username', favorites: [{ _id: '_id' }] }
  },
  _id: '_id',
  refetch: jest.fn()
};

const mocks = [
  {
    request: {
      query: UNLIKE_RECIPE,
      variables: {
        _id: props._id,
        username: initialState.username
      }
    },
    result: {
      data: {
        unlikeRecipe: { _id: 'id', likes: 0 }
      }
    }
  },
  {
    request: {
      query: LIKE_RECIPE,
      variables: {
        _id: props._id,
        username: initialState.username
      }
    },
    result: {
      data: {
        likeRecipe: { _id: 'id', likes: 0 }
      }
    }
  }
];
let component;
let wrapper;

beforeEach(() => {
  wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LikeRecipe {...props} />
    </MockedProvider>
  );

  component = wrapper.find(LikeRecipe);
  component.setState(initialState);
});

afterEach(() => {
  wrapper.unmount();
});

it('renders Unlike button if user already liked the recipe', () => {
  expect(toJSON(component.find('button'))).toMatchSnapshot();
});

it('toggle liked state if user already liked the recipe', async () => {
  const prevState = component.state();
  component.find('button').simulate('click');
  await wait(0);

  expect(prevState.liked).not.toBe(component.state().liked);
  expect(props.refetch).toHaveBeenCalled();
  expect(props.refetch).toHaveBeenCalledTimes(1);
});

it('renders Like button if user did NOT liked the recipe', () => {
  const props = {
    session: {
      getCurrentUser: { username: 'username', favorites: [{ _id: '' }] }
    },
    _id: '_id',
    refetch: jest.fn()
  };
  wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LikeRecipe {...props} />
    </MockedProvider>
  );

  component = wrapper.find(LikeRecipe);
  component.setState(initialState);

  expect(toJSON(component.find('button'))).toMatchSnapshot();
});

it('toggle liked state if user already liked the recipe', async () => {
  const props = {
    session: {
      getCurrentUser: { username: 'username', favorites: [{ _id: '' }] }
    },
    _id: '_id',
    refetch: jest.fn()
  };
  wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LikeRecipe {...props} />
    </MockedProvider>
  );
  component = wrapper.find(LikeRecipe);
  component.setState(initialState);

  const prevState = component.state();
  component.find('button').simulate('click');
  await wait(0);

  expect(prevState.liked).not.toBe(component.state().liked);
  expect(props.refetch).toHaveBeenCalled();
  expect(props.refetch).toHaveBeenCalledTimes(1);
});
