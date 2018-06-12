import React from 'react';

export const PaperScopeContext = React.createContext();

export const renderWithPaperScope = render => (
  <PaperScopeContext.Consumer>
    {({ paper }) => render(paper)}
  </PaperScopeContext.Consumer>
);

export default WrappedComponent => props => (
  <PaperScopeContext.Consumer>
    {context => <WrappedComponent {...props} {...context} />}
  </PaperScopeContext.Consumer>
);
