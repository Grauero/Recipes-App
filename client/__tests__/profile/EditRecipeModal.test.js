import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

import EditRecipeModal from '../../src/components/profile/EditRecipeModal';
import { UPDATE_USER_RECIPE } from '../../src/queries';

const props = {
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  closeModal: jest.fn(),
  recipe: {
    _id: '_id',
    name: 'name',
    imageUrl: 'imageUrl',
    category: 'category',
    description: 'desc',
    modal: false
  }
};

const mocks = [
  {
    request: {
      query: UPDATE_USER_RECIPE,
      variables: {
        _id: props.recipe._id,
        name: props.recipe.name,
        imageUrl: props.recipe.imageUrl,
        category: props.recipe.category,
        description: props.recipe.description
      }
    },
    result: {
      data: {
        updateUserRecipe: { data: 'data' }
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
        <EditRecipeModal {...props} />
      </BrowserRouter>
    </MockedProvider>
  );

  component = wrapper.find(EditRecipeModal);
});

afterEach(() => {
  wrapper.unmount();
});

it('calls props.handleChange when user updates inputs', () => {
  const updatedValue = { value: 'updatedValue' };

  component
    .find('input')
    .at(0)
    .simulate('change', updatedValue);
  expect(props.handleChange).toHaveBeenCalled();
  expect(props.handleChange).toHaveBeenCalledTimes(1);

  component
    .find('input')
    .at(1)
    .simulate('change', updatedValue);
  expect(props.handleChange).toHaveBeenCalled();
  expect(props.handleChange).toHaveBeenCalledTimes(2);

  component
    .find('input')
    .at(2)
    .simulate('change', updatedValue);
  expect(props.handleChange).toHaveBeenCalled();
  expect(props.handleChange).toHaveBeenCalledTimes(3);
});

it('calls props.closeModal by pressing Cancel button', () => {
  component
    .find('button')
    .at(1)
    .simulate('click');

  expect(props.closeModal).toHaveBeenCalled();
  expect(props.closeModal).toHaveBeenCalledTimes(1);
});

it('submits form', async () => {
  component.find('form').simulate('submit');

  expect(props.handleSubmit).toHaveBeenCalled();
  expect(props.handleSubmit).toHaveBeenCalledTimes(1);
});
