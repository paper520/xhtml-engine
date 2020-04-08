### 结点查找

- 获取父结点
```js
let newEngine = Engine.parent();
```
- 获取祖宗
```js
let newEngine = Engine.parents();
```
- 获取孩子
```js
let newEngine = Engine.children();
```
- 获取同胞
```js
let newEngine = Engine.siblings();
```
- 获取下一个兄弟
```js
let newEngine = Engine.next();
```
- 获取后续全部兄弟
```js
let newEngine = Engine.nextAll();
```
- 获取前一个兄弟
```js
let newEngine = Engine.prev();
```
- 获取前置全部兄弟
```js
let newEngine = Engine.prevAll();
```
- 选中当前维护的第index
```js
let newEngine = Engine.eq(index);
```

这些方法都会返回一个包含查找结果的新引擎对象！

[返回首页](../README.md)