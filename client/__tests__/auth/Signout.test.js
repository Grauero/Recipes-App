import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';

import { Signout } from '../../src/components/auth/Signout';

const props = { history: { push: jest.fn() } };
let component;
let wrapper;

beforeEach(() => {
  wrapper = mount(
    <MockedProvider mocks={[]} addTypename={false}>
      <BrowserRouter>
        <Signout {...props} />
      </BrowserRouter>
    </MockedProvider>
  );

  component = wrapper.find(Signout);
});

afterEach(() => {
  wrapper.unmount();
});

it('matches snapshot', () => {
  expect(toJSON(component)).toMatchSnapshot();
});

it('removes token in localStorage when user clicks logout button', () => {
  window.localStorage.setItem('token', 'token');
  component.find('button').simulate('click');

  expect(window.localStorage.getItem('token')).toBeNull();
});

it('redirects to "/" when user clicks logout button', () => {
  component.find('button').simulate('click');

  expect(props.history.push).toHaveBeenCalled();
  expect(props.history.push).toHaveBeenCalledWith('/');
});
