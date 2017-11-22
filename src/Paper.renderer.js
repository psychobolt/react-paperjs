// @flow
import Reconciler from 'react-reconciler';
import { Group, Item, TextItem } from 'paper';

import TYPES, { type PaperTypes, type Paper } from './Paper.types';
import { diffProps, updateProps } from './Paper.component';
import { type ScopedProps } from './Paper.container';

type Props = {
  scopedProps: ScopedProps<*>,
  children: any,
};

type CreateInstance = (type: string, props: Props, paper: Paper) => any;

export function getTypes(instanceFactory: PaperTypes): CreateInstance {
  return (type: string, { children, ...rest }: Props, paper: Paper) => {
    const TYPE = instanceFactory[type];
    return TYPE && TYPE(rest, paper, children);
  };
}

const createInstance = getTypes(TYPES);

type HostContext = {};

type Instance = {};

type Fiber = {};

/* eslint-disable no-console, no-unused-vars */
const defaultHostConfig = {
  getRootHostContext(paper: Paper) {
    return paper;
  },
  getChildHostContext(parentHostContext: HostContext, type: string, instance: Instance) {
    return {};
  },
  getPublicInstance(instance: Instance) {
    return instance;
  },
  createInstance,
  appendInitialChild(parent: Instance, child: Instance) {
    if (parent instanceof Group && child instanceof Item) {
      parent.addChild(child);
    } else if (parent instanceof TextItem && typeof child === 'string') {
      Object.assign(parent, { content: child });
    } else {
      console.log('append initial child');
    }
  },
  finalizeInitialChildren(instance: Instance, type: string, props: Props) {
    return true;
  },
  prepareUpdate(
    instance: Instance,
    type: string,
    oldProps: Props,
    newProps: Props,
    paper: Paper,
    hostContext: HostContext,
  ) {
    return diffProps(oldProps, newProps);
  },
  shouldSetTextContent(type: string, props: Props) {
    return typeof props.children === 'string';
  },
  shouldDeprioritizeSubtree(type: string, props: Props) {
    return false;
  },
  createTextInstance(
    text: string,
    paper: Paper,
    hostContext: HostContext,
    internalInstanceHandle: Fiber,
  ) {
    return text;
  },
  scheduleDeferredCallback: window.requestIdleCallback,
  prepareForCommit() {
    console.log('prepare for commit');
  },
  resetAfterCommit() {
    console.log('reset for commit');
  },
  useSyncScheduling: true,
  now: Date.now,
  mutation: {
    commitUpdate(
      instance: Instance,
      updatePayload: [],
      type: string,
      oldProps: Props,
      newProps: Props,
      internalInstanceHandle: Fiber,
    ) {
      updateProps(instance, updatePayload, type, oldProps, newProps);
    },
    commitMount(instance: Instance, type: string, newProps: Props, internalInstanceHandle: Fiber) {
      console.log('commit mount');
    },
    commitTextUpdate(textInstance: Instance, oldText: string, newText: string) {
      console.log('commit text update');
    },
    resetTextContent(instance: Instance) {
      console.log('reset text content');
    },
    appendChild(parent: Instance, child: Instance) {
      if (parent instanceof Group && child instanceof Item) {
        parent.addChild(child);
      } else {
        console.log('append child to mounted parent');
      }
    },
    appendChildToContainer(container: Paper, child: Instance) {
      console.log('append child to container');
    },
    insertBefore(parent: Instance, child: Instance, beforeChild: Instance) {
      console.log('insert before child');
    },
    insertInContainerBefore(container: Paper, child: Instance, beforeChild: Instance) {
      // TODO
      console.log('insert child in container before child');
    },
    removeChild(parent: Instance, child: Instance) {
      if (child instanceof Item) {
        child.remove();
      } else {
        // TODO remove logger
        console.log('remove child');
      }
    },
    removeChildFromContainer(container: Paper, child: Instance) {
      // TODO
      console.log('remove from container');
    },
  },
};
/* eslint-enable no-console, no-unused-vars */

export default class PaperRenderer {
  defaultHostConfig = defaultHostConfig;
  defaultTypes = TYPES;
  reconciler: any;
  createInstance: createInstance;

  constructor() {
    const instanceFactory = this.getInstanceFactory();
    let hostConfig = this.getHostConfig();

    /* Overrides createInstance if host config is not changed but types are */
    if (this.defaultTypes !== instanceFactory
        && defaultHostConfig === hostConfig) {
      this.createInstance = getTypes(instanceFactory);
      hostConfig = {
        ...hostConfig,
        createInstance: this.createInstance,
      };
    } else {
      this.createInstance = createInstance;
    }

    this.reconciler = Reconciler(hostConfig);
  }

  getInstanceFactory() {
    return this.defaultTypes;
  }

  getHostConfig() {
    return this.defaultHostConfig;
  }
}
