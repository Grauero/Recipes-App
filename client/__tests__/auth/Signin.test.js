import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';

import { Signin } from '../../src/components/auth/Signin';
import { SIGNIN_USER } from '../../src/queries';

const initialState = { username: 'username', password: 'password' };
const props = { history: { push: jest.fn() }, refetch: jest.fn() };

const mocks = [
  {
    request: {
      query: SIGNIN_USER,
      variables: {
        username: initialState.username,
        password: initialState.password
      }
    },
    result: {
      data: {
        signinUser: { token: 'token' }
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
        <Signin {...props} />
      </BrowserRouter>
    </MockedProvider>
  );

  component = wrapper.find(Signin);
  component.setState(initialState);
});

afterEach(() => {
  wrapper.unmount();
});

it('matches snapshot', () => {
  expect(toJSON(component)).toMatchSnapshot();
});

it('updates state while changing input value', () => {
  const input = component.find('input').get(0);
  input.props.onChange({ target: { name: 'username', value: 'updatedValue' } });

  expect(component.state()).not.toBe(initialState);
  expect(component.state().username).toBe('updatedValue');
});

it('calls the SIGNIN_USER mutation and writes auth token to localStorage when user submits form', async () => {
  component.find('form').simulate('submit');
  await wait(0);

  expect(window.localStorage.getItem('token')).toBe('token');
});

it('calls the SIGNIN_USER mutation and resets component state when user submits form', async () => {
  component.find('form').simulate('submit');
  await wait(0);

  expect(component.state()).not.toBe(initialState);
  expect(component.state().username).toBe('');
  expect(component.state().password).toBe('');
});

it('calls the SIGNIN_USER mutation and calls props.refetch() when user submits form', async () => {
  component.find('form').simulate('submit');
  await wait(0);

  expect(props.refetch).toHaveBeenCalled();
});

it('calls the SIGNIN_USER mutation and redirects to "/" when user submits form', async () => {
  component.find('form').simulate('submit');
  await wait(0);

  expect(props.history.push).toHaveBeenCalled();
  expect(props.history.push).toHaveBeenCalledWith('/');
});
