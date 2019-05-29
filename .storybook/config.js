import '@storybook/addon-console';
import { configure } from '@storybook/react';

function loadStories() {
  require('../stories'); // eslint-disable-line global-require
}

configure(loadStories, module);
