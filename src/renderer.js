import React from 'react';
import ReactReconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import { Text } from './components/types';

class Surface extends React.Component {
  componentDidMount() {
    this._mountNode = ReactReconcilerInst.createContainer(this.canvas);
    ReactReconcilerInst.updateContainer(this.props.children, this._mountNode, this);
  }
  render () {
    return (
      <canvas ref={(e) => this.canvas = e} />
    );
  }
}

const hostConfig = {
  now: Date.now,
  getRootHostContext: () => {
    return emptyObject;
  },
  getChildHostContext: () => {
    return emptyObject;
  },
  getPublicInstance: (instance) => {
    return instance;
  },
  shouldSetTextContent: () => {
    log('shouldSetTextContent > ');
  },
  prepareForCommit: () => {
    log('prepareForCommit > ');
  },
  createInstance: (
    type, // 组件类型
    newProps, // 组件属性
    rootContainerInstance, // 指向了ReactReconcilerInst.createContainer的元素
    _currentHostContext, // 指向了childHostContext
    workInProgress // 指向了一个FiberNode正在工作的节点对象
  ) => {
    console.log(type);
  },
  createTextInstance: () => {
    log('createTextInstance > ');
  },
  resetAfterCommit: () => {
    log('resetAfterCommit > ');
  },
  finalizeInitialChildren: () => {
    log('finalizeInitialChildren > ');
  },
  appendInitialChild: () => {
    log('appendInitialChild > ');
  },
  appendChild: () => {
    log('appendChild > ');
  },
  appendChildToContainer: () => {
    log('appendChildToContainer > ');
  },
  prepareUpdate: () => {
    log('prepareUpdate > ');
  },
  commitUpdate: () => {
    log('commitUpdate > ');
  },
  commitTextUpdate: () => {
    log('commitTextUpdate > ');
  },
  removeChild: () => {
    log('removeChild > ');
  },
  removeChildFromContainer: (parentInstance, child) => {
    log('removeChildFromContainer > ');
  },
  supportsMutation: true,
};
const ReactReconcilerInst = ReactReconciler(hostConfig);
const log = function() {
  console.log.apply(this, arguments);
}

export default Surface;
export { 
  Text,
};
