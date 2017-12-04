// @flow
import React, { type ComponentType } from 'react';

type Props = {};

export class RefContainer<P> extends React.Component<P> {
  ref = (instanceRef: Object) => {
    this.instance = instanceRef instanceof RefContainer ? instanceRef.instance : instanceRef;
  }

  instance: ?Object;
}

export default (WrappedComponent: ComponentType<*>) =>
  class extends RefContainer<Props> {
    render() {
      const { ref } = this;
      const refOpt = (((typeof WrappedComponent === 'string') || Object.prototype.isPrototypeOf.call(React.Component, WrappedComponent)) ? { ref } : { instanceRef: ref });
      return (
        <WrappedComponent {...{ ...this.props, ...refOpt }} />
      );
    }
  };
