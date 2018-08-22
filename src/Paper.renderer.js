// @flow
import Reconciler from 'react-reconciler';
import { Layer, Group, Item, TextItem, Tool } from 'paper';

import TYPES, { type Types, type Paper } from './Paper.types';
import { diffProps, updateProps } from './Paper.component';

type Props = {
  pathData: string,
  children: any,
};

type CreateInstance = (type: string, props: Props, paper: Paper) => any;

export function getTypes(instanceFactory: Types): CreateInstance {
  return (type: string, { children, pathData, ...rest }: Props, paper: Paper) => {
    const TYPE = instanceFactory[type];
    let instance;
    if (TYPE) {
      instance = TYPE(rest, paper, children);
      if (pathData) {
        instance.pathData = pathData;
      }
    }
    return instance;
  };
}

const createInstance = getTypes(TYPES);

type HostContext = {};

type Instance = Object;

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
      // console.log('ignore append initial child');
    }
  },
  finalizeInitialChildren(instance: Instance, type: string, props: Props) {
    return true;
  },
  commitMount(instance: Instance, type: string, newProps: Props, internalInstanceHandle: Fiber) {
    // console.log('ignore commit mount');
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
    const { children } = props;
    return typeof children === 'string';
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
    // console.log('ignore prepare for commit');
  },
  resetAfterCommit() {
    // console.log('ignore reset for commit');
  },
  now: Date.now,
  supportsMutation: true,
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
  commitTextUpdate(textInstance: Instance, oldText: string, newText: string) {
    // console.log('ignore commit text update');
  },
  resetTextContent(instance: Instance) {
    // console.log('ignore reset text content');
  },
  appendChild(parent: Instance, child: Instance) {
    if (parent instanceof Group && child instanceof Item) {
      parent.addChild(child);
    } else {
      // console.log('ignore append child', parent, child);
    }
  },
  appendChildToContainer(container: Paper, child: Instance) {
    if (child instanceof Item) {
      const { project } = container;
      const { $$default, $$metadata } = project.layers;
      if (child instanceof Layer) {
        child.insertBelow($$metadata);
      } else {
        child.addTo($$default);
      }
    } else if (child instanceof Tool) {
      child.activate();
    } else {
      // console.log('ignore append child to container', child);
    }
  },
  insertBefore(parent: Instance, child: Instance, beforeChild: Instance) {
    // console.log('ignore insert before child', parent, child, beforeChild);
  },
  insertInContainerBefore(container: Paper, child: Instance, beforeChild: Instance) {
    const { $$default, $$metadata } = container.project.layers;
    if (child instanceof Layer && beforeChild instanceof Layer) {
      child.insertBelow(beforeChild);
    } else if (child instanceof Layer) {
      child.insertBelow($$metadata);
    } else if (child instanceof Item && beforeChild instanceof Layer) {
      child.addTo($$default);
    } else if (child instanceof Item && beforeChild instanceof Item) {
      child.insertBelow(beforeChild);
    } else {
      // console.log('ignore insert in container before child', child, beforeChild);
    }
  },
  removeChild(parent: Instance, child: Instance) {
    child.remove();
  },
  removeChildFromContainer(container: Paper, child: Instance) {
    if (child instanceof Object) {
      child.remove();
    }
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
