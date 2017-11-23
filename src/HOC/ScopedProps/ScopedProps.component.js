// @flow
import React, { type ComponentType } from 'react';
import { PaperScope } from 'paper';
import PropTypes from 'prop-types';

import type { Paper } from '../../Paper.types';
import type { ScopedProps } from '../../Paper.container';

type Props = {
  scopedProps: ScopedProps<*>
};

export default (WrappedComponent: ComponentType<*>) =>
  class extends React.PureComponent<Props> {
    static defaultProps = {
      scopedProps: (scope: Paper) => ({}), // eslint-disable-line no-unused-vars
    };

    static contextTypes = {
      paper: PropTypes.instanceOf(PaperScope).isRequired,
    };

    instance: ?Object;

    render() {
      const { scopedProps, ...rest } = this.props;
      return (
        <WrappedComponent
          ref={ref => { this.instance = ref; }}
          {...{ ...rest, ...scopedProps(this.context.paper) }}
        />
      );
    }
  };
