import React from 'react';
import { shallow } from 'enzyme';

import Messenger from '../Messenger.component';

test('component <Messenger /> should render correctly', () => {
  shallow(<Messenger />);
});
