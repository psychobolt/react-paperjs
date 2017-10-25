import React from 'react';
import { shallow } from 'enzyme';

import HelloWorld from '../HelloWorld.component';

test('component <HelloWorld /> should render correctly', () => {
  const wrapper = shallow(<HelloWorld />);
  expect(wrapper).toMatchSnapshot();
});
