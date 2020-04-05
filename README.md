# xhtml-engine
🌊 基于node.js开发的xhtml字符串解析引擎。

[![downloads](https://img.shields.io/npm/dm/xhtml-engine.svg)](https://yelloxing.github.io/npm-downloads?interval=7&packages=xhtml-engine)
[![install size](https://packagephobia.now.sh/badge?p=xhtml-engine)](https://packagephobia.now.sh/result?p=xhtml-engine)
[![Version](https://img.shields.io/npm/v/xhtml-engine.svg)](https://www.npmjs.com/package/xhtml-engine)
[![License](https://img.shields.io/npm/l/xhtml-engine.svg)](https://github.com/yelloxing/xhtml-engine/blob/master/LICENSE)

## How to use?

首先你需要通过命令行安装，就像这样：

```bash
npm install --save xhtml-engine
```

安装好了以后，传入需要的字符串获取引擎对象：

```js
let Engine = require('xhtml-engine')(tempate);
```

获得引擎对象以后，就可以直接调用上面的方法进行操作了（这和在浏览器上操作DOM很像）。

### 操作方法

这个引擎对象上有如下这些方法可以使用：

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

这些方法会返回一个包含查找结果的新引擎对象，无论是旧的还是新引擎对象，你都可以通过下面的方法查看其值：

```js
let value = Engine.valueOf();
```

## 开源协议

[MIT](https://github.com/yelloxing/xhtml-engine/blob/master/LICENSE)

Copyright (c) 2020 走一步 再走一步