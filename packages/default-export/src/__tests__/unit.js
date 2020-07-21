import React from 'react';
import { shallow } from 'enzyme';

import Component from '..';

it('default <Component /> renders without crashing', () => {
  shallow(<Component />);
});
