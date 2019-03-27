import '@storybook/addon-console';
import { configure } from '@storybook/react';

const reqMain = require.context('../stories', true, /\.?stories\.js$/);
const reqLib = require.context('../src', true, /\.?stories\.js$/);
const reqPackages = require.context('../packages', true, /\.?stories\.js$/);

function loadStories() {
  require('../stories'); // eslint-disable-line global-require
  reqMain.keys().forEach(filename => reqMain(filename));
  reqLib.keys().forEach(filename => reqLib(filename));
  reqPackages.keys().forEach(filename => reqPackages(filename));
}

configure(loadStories, module);
