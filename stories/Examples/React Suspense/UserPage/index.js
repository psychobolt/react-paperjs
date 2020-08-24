import UserPage from './UserPage.component'; // eslint-disable-line import/no-duplicates
import code from '!raw-loader!./UserPage.component'; // eslint-disable-line import/no-duplicates

UserPage.parameters = {
  docs: {
    source: {
      code,
    },
  },
};

module.exports.UserPage = UserPage;
