import '@storybook/addon-console';
import { addParameters } from '@storybook/react';

// workaround for issue: https://github.com/tuchk4/storybook-readme/issues/221
addParameters({ options: { theme: {} } });
