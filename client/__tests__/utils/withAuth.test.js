import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';

import withAuth, { isAuth } from '../../src/components/utils/withAuth';
import { GET_CURRENT_USER } from '../../src/queries';

const mocks = [
  {
    request: {
      query: GET_CURRENT_USER
    },
    result: {
      data: {
        getCurrentUser: {
          username: 'username',
          joinDate: 'date',
          email: 'email',
          favorites: []
        }
      }
    }
  }
];
const testComponent = () => <div>Test Component</div>;
const testComponentWithProps = ({ prop1 }) => <div>{prop1}</div>;
let component;
let wrapper;

beforeEach(async () => {
  wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      {withAuth(isAuth)(testComponent)()}
    </MockedProvider>
  );
  await wait(0);
  component = wrapper.find('Query');
});

afterEach(() => {
  wrapper.unmount();
});

it('renders initial component if server responded with data', () => {
  expect(component.html()).toBe('<div>Test Component</div>');
});

it('renders provided component with props', async () => {
  wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      {withAuth(isAuth)(() => testComponentWithProps({ prop1: 'prop1' }))()}
    </MockedProvider>
  );
  await wait(0);

  expect(wrapper.html()).toBe('<div>prop1</div>');
});
