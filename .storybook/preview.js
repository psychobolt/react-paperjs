import '@storybook/addon-console';
import { addParameters, addDecorator } from '@storybook/react';
import { addReadme } from 'storybook-readme';

// workaround for issue: https://github.com/tuchk4/storybook-readme/issues/221
addParameters({ options: { theme: {} } });

addDecorator(addReadme);
