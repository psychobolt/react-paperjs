import Flexbox from './Flexbox.component'; // eslint-disable-line import/no-duplicates
import code from '!!raw-loader!./Flexbox.component'; // eslint-disable-line import/no-duplicates

Flexbox.parameters = {
  docs: {
    source: {
      code,
    },
  },
};

module.exports.Flexbox = Flexbox;
