### react-playground

## 创建操作

* crateInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress) 这是react-reconciler想要根据目标元素创建ui元素实例的地方，一般这里的目标为DOM元素, 这里使用`document.createElement`来创建type的DOM元素。type可以为DOM的元素名称比如`div`、`p`、`img`等. 

* createTextInstance(text) 只有子元素是文本或者数字会进入此函数, 用于创建文本或数字节点 [twitter讨论](https://twitter.com/dan_abramov/status/940923866884472832)

## UI 树操作

* appendInitialChild(parentInstance, child) 调用此函数创建初始化ui树, 映射到domElemetn.appendChild. 将子元素附加到父元素种

* appendChild(parentInstance, child) 这个方法和appendInitialChild类似, 用于后续的ui树操作

* appendChildToContainer(container, child) 这个方法用于将子元素映射到跟元素种, 这时会形成真实的DOM

## 更新prop操作

* finalizeInitialChildren 可以对children做一些初始化工作, 一般情况忽略

* prepareUpdate 这里是需要我们对newProps和oldProps进行diff的地方, 这个函数是在commit还未提交钱进行计算, 这样可以跨越多个帧之间进行计算. 当一切准备好之后再commit整个树

* commitUpdate 将newProps更新到元素种, r

* commitTextUpdate 更新节点的值

* removeChild 删除节点