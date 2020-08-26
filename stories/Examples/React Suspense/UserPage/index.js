export const UserPage = require('./UserPage.component').default; // eslint-disable-line global-require

UserPage.parameters = {
  docs: {
    source: {
      code: require('!!raw-loader!./UserPage.component').default, // eslint-disable-line global-require
    },
  },
};
