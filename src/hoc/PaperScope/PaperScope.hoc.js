import React from 'react';
import { PaperScope } from 'paper';
import PropTypes from 'prop-types';

const contextTypes = { paper: PropTypes.instanceOf(PaperScope).isRequired };

export const renderWithPaperScope = render => {
  const Container = (props, context) => render(context.paper);
  Container.contextTypes = contextTypes;
  return <Container />;
};

export default WrappedComponent => {
  const Container = (props, context) => <WrappedComponent {...props} paper={context.paper} />;
  Container.contextTypes = contextTypes;
  return Container;
};
