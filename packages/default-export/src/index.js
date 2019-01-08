// @flow
import * as React from 'react';

type Props = {
  children: React.Node
}

export default (props: Props) => {
  console.log('You are calling the default-export package!'); // eslint-disable-line no-console
  return <div {...props} />;
};
