// @flow
import React, { type ComponentType } from 'react';
import { PaperScope } from 'paper';
import PropTypes from 'prop-types';

import type { Paper } from '../../Paper.types';
import type { ScopedProps } from '../../Paper.container';

type Props = {
  scopedProps: ScopedProps<*>
};

export class ScopedComponent<P> extends React.Component<P> {
  static defaultProps = {
    scopedProps: (scope: Paper) => ({}), // eslint-disable-line no-unused-vars
  };

  static contextTypes = {
    paper: PropTypes.instanceOf(PaperScope).isRequired,
  };

  ref = (instanceRef: Object) => {
    this.instance = instanceRef instanceof ScopedComponent ? instanceRef.instance : instanceRef;
  }

  instance: ?Object;
}

export default (WrappedComponent: ComponentType<*>) =>
  class extends ScopedComponent<Props> {
    render() {
      const { ref } = this;
      const { scopedProps, ...rest } = this.props;
      const refOpt = (((typeof WrappedComponent === 'string') || Object.prototype.isPrototypeOf.call(React.Component, WrappedComponent)) ? { ref } : { instanceRef: ref });
      return (
        <WrappedComponent {...{ ...rest, ...scopedProps(this.context.paper), ...refOpt }} />
      );
    }
  };
