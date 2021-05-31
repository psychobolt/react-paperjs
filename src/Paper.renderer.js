// @flow
import Reconciler from 'react-reconciler';
import Paper from 'paper';

import TYPES, { type Types } from './Paper.types';
import { diffProps, updateProps } from './Paper.component';

type Props = {
  pathData?: string,
  children?: any,
};

type CreateInstance = (type: string, props: Props, paper: typeof Paper.PaperScope) => any;

export function getTypes(instanceFactory: Types): CreateInstance {
  return (type: string, { children, pathData, ...rest }: Props, paper: typeof Paper.PaperScope) => {
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

const createInstance: CreateInstance = getTypes(TYPES);

type HostContext = {};

type Instance = Object;

type Fiber = {};

type PaperScope = typeof Paper.PaperScope;

/* eslint-disable no-console, no-unused-vars */
const defaultHostConfig = {
  getRootHostContext(paper: PaperScope): PaperScope {
    return paper;
  },
  getChildHostContext(parentHostContext: HostContext, type: string, instance: Instance): any {
    return {};
  },
  getPublicInstance(instance: Instance): Instance {
    return instance;
  },
  createInstance,
  appendInitialChild(parent: Instance, child: Instance) {
    if (parent instanceof Paper.Group && child instanceof Paper.Item) {
      parent.addChild(child);
    } else if (parent instanceof Paper.TextItem && typeof child === 'string') {
      Object.assign(parent, { content: child });
    } else {
      // console.log('ignore append initial child');
    }
  },
  finalizeInitialChildren(instance: Instance, type: string, props: Props): boolean {
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
    paper: PaperScope,
    hostContext: HostContext,
  ): any[] {
    return diffProps(oldProps, newProps);
  },
  shouldSetTextContent(type: string, props: Props): boolean {
    const { children } = props;
    return typeof children === 'string';
  },
  shouldDeprioritizeSubtree(type: string, props: Props): boolean {
    return false;
  },
  createTextInstance(
    text: string,
    paper: PaperScope,
    hostContext: HostContext,
    internalInstanceHandle: Fiber,
  ): string {
    return text;
  },
  scheduleDeferredCallback:
    (typeof window !== 'undefined'
      ? window.requestIdleCallback
      : function dummyRequestIdleCallback(callback, options) {
        setTimeout(callback, options.timeout);
      }: any | ((callback: () => any, options?: any) => void)),
  prepareForCommit(): any {
    return null;
  },
  clearContainer(container: PaperScope) {
    // console.log('ignore clear container');
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
    if (parent instanceof Paper.Group && child instanceof Paper.Item) {
      parent.addChild(child);
    } else {
      // console.log('ignore append child', parent, child);
    }
  },
  appendChildToContainer(container: PaperScope, child: Instance) {
    if (child instanceof Paper.Item) {
      const { project } = container;
      const { $$default, $$metadata } = project.layers;
      if (child instanceof Paper.Layer) {
        child.insertBelow($$metadata);
      } else {
        child.addTo($$default);
      }
    } else if (child instanceof Paper.Tool) {
      child.activate();
    } else {
      // console.log('ignore append child to container', child);
    }
  },
  insertBefore(parent: Instance, child: Instance, beforeChild: Instance) {
    // console.log('ignore insert before child', parent, child, beforeChild);
  },
  insertInContainerBefore(container: PaperScope, child: Instance, beforeChild: Instance) {
    const { $$default, $$metadata } = container.project.layers;
    if (child instanceof Paper.Layer && beforeChild instanceof Paper.Layer) {
      child.insertBelow(beforeChild);
    } else if (child instanceof Paper.Layer) {
      child.insertBelow($$metadata);
    } else if (child instanceof Paper.Item && beforeChild instanceof Paper.Layer) {
      child.addTo($$default);
    } else if (child instanceof Paper.Item && beforeChild instanceof Paper.Item) {
      child.insertBelow(beforeChild);
    } else {
      // console.log('ignore insert in container before child', child, beforeChild);
    }
  },
  removeChild(parent: Instance, child: Instance) {
    child.remove();
  },
  removeChildFromContainer(container: PaperScope, child: Instance) {
    if (child instanceof Object) {
      child.remove();
    }
  },
};
/* eslint-enable no-console, no-unused-vars */

export default class PaperRenderer {
  defaultHostConfig: typeof defaultHostConfig = defaultHostConfig;

  defaultTypes: Types = TYPES;

  reconciler: any;

  createInstance: CreateInstance;

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

  getInstanceFactory(): Types {
    return this.defaultTypes;
  }

  getHostConfig(): typeof defaultHostConfig {
    return this.defaultHostConfig;
  }
}
