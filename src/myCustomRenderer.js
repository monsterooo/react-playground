import ReactReconciler from 'react-reconciler';

const rootHostContext = {};
const childHostContext = {};
const hostConfig = {
  now: Date.now, // react调和是为目标的调度更新
  getRootHostContext: () => {
    return rootHostContext;
  },
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type, props) => {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  prepareForCommit: () => {},
  createInstance: (
    type, // 组件类型
    newProps, // 组件属性
    rootContainerInstance, // 指向了ReactReconcilerInst.createContainer的元素
    _currentHostContext, // 指向了childHostContext
    workInProgress // 指向了一个FiberNode正在工作的节点对象
  ) => {
    const domElement = document.createElement(type);
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === 'children') {
        // 如果子元素是一个字符串则赋值给当然的DOM元素
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue;
        }
      } else if (propName === 'onClick') {
        // 绑定时间
        domElement.addEventListener('click', propValue);
      } else if (propName === 'className') {
        // 设置类
        domElement.setAttribute('class', propValue);
      } else {
        // 设置其他属性
        domElement.setAttribute(propName, propValue);
      }
    });
    return domElement;
    // console.log('createInstance type > ', type);
    // console.log('createInstance newProps > ', newProps);
    // console.log('createInstance workInProgress > ', workInProgress);
  },
  createTextInstance: (newText, rootContainerInstance, currentHostContext, workInProgress,) => {
    // console.log('createTextInstance newText > ', newText);
    return document.createTextNode(newText);
  },
  resetAfterCommit: () => {},
  finalizeInitialChildren: (domElement, type, props, rootContainerInstance, hostContext) => {
    // console.log(domElement, type, props, rootContainerInstance, hostContext);
  },
  appendInitialChild: (parentInstance, child) => {
    // console.log('appendInitialChild > ', parentInstance, child);
    parentInstance.appendChild(child);
  },
  appendChild: (parentInstance, child) => {
    // console.log('appendChild > ', parentInstance, child);
    parentInstance.appendChild(child);
  },
  appendChildToContainer: (container, child) => {
    // console.log('appendChildToContainer > ', container, child);
    container.appendChild(child);
  },
  prepareUpdate: (domElement, type, oldProps, newProps, rootContainerInstance, hostContext) => {
    return true; // 属性计算这里直接返回true
  },
  commitUpdate: (domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
    // console.log('commitUpdate > ', domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle);
    // console.log(internalInstanceHandle);
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue;
        }
      } else {
        domElement.setAttribute(propName, propValue);
      }
    });
  },
  commitTextUpdate: (textInstance, oldText, newText) => {
    textInstance.text = newText;
  },
  removeChild: (parentInstance, child) => {
    parentInstance.removeChild(child);
  },
  supportsMutation: true,
};

/**
// 必备函数
const hostConfig = {
  now: Date.now, // react调和是为目标的调度更新
  getRootHostContext: () => {},
  getChildHostContext: () => {},
  shouldSetTextContent: () => {},
  prepareForCommit: () => {},
  createInstance: () => {},
  createTextInstance: () => {},
  resetAfterCommit: () => {},
  finalizeInitialChildren: () => {},
  appendInitialChild: () => {},
};
*/
const ReactReconcilerInst = ReactReconciler(hostConfig);
export default {
  render: (reactElement, domElement, callback) => {
    if(!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
    }
    return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
  }
}