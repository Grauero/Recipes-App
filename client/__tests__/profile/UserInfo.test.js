import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';

import UserInfo from '../../src/components/profile/UserInfo';

const props = {
  session: {
    getCurrentUser: {
      username: 'username',
      email: 'email',
      joinDate: 'Tue Feb 26 2019 17:30:35 GMT+0300 (Москва, стандартное время)',
      favorites: [{ _id: '_id', name: 'name' }]
    }
  }
};

let component;
let wrapper;

beforeEach(() => {
  wrapper = mount(
    <BrowserRouter>
      <UserInfo {...props} />
    </BrowserRouter>
  );

  component = wrapper.find(UserInfo);
});

afterEach(() => {
  wrapper.unmount();
});

it('matches snapshot', () => {
  expect(toJSON(component)).toMatchSnapshot();
});

it('formats Date correctly', () => {
  expect(
    component
      .find('p')
      .at(2)
      .html()
  ).toBe('<p>Join Date: 2/26/2019 at 5:30:35 PM</p>');
});

it('renders list of favorites if it exists', () => {
  expect(component.find('li').html()).toBe('<li><a href="/recipes/_id"><p>name</p></a></li>');
});

it('renders message if user did NOT have favorites', () => {
  const props = {
    session: {
      getCurrentUser: {
        username: 'username',
        email: 'email',
        joinDate: 'Tue Feb 26 2019 17:30:35 GMT+0300 (Москва, стандартное время)',
        favorites: []
      }
    }
  };
  wrapper = mount(
    <BrowserRouter>
      <UserInfo {...props} />
    </BrowserRouter>
  );

  expect(
    wrapper
      .find(UserInfo)
      .find('strong')
      .html()
  ).toBe('<strong>You have no favorites currently.</strong>');
});
