// @flow
import React, { type ComponentType } from 'react';
import { PaperScope } from 'paper';
import PropTypes from 'prop-types';

import type { Paper } from '../../Paper.types';
import type { ScopedProps } from '../../Paper.container';

type Props = {
  scopedProps: ScopedProps<*>
};

type Context = {
  paper: Paper
};

const withScopedProps = (Component: ComponentType<*>) => {
  const WrappedComponent = (
    { scopedProps = scope => ({}), ...rest }: Props, // eslint-disable-line no-unused-vars
    context: Context,
  ) => <Component {...{ ...rest, ...scopedProps(context.paper) }} />;
  WrappedComponent.contextTypes = { paper: PropTypes.instanceOf(PaperScope).isRequired };
  return WrappedComponent;
};

export default withScopedProps;
