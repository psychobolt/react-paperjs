import '@storybook/addon-console';
import { configure } from '@storybook/react';

const reqMain = require.context('../stories', true, /\.stories\.js$/);
const reqLib = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  require('../stories'); // eslint-disable-line global-require
  reqMain.keys().forEach(filename => reqMain(filename));
  reqLib.keys().forEach(filename => reqLib(filename));
}

configure(loadStories, module);
