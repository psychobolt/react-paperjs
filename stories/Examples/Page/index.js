import React from 'react';

import { Page } from './Page.component';
import * as HeaderStories from '../Header';

export default {
  title: 'Examples/Page',
  component: Page,
};

const Template = args => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
