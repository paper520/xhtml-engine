### 属性等基本操作

- 获取或设置innerHTML
```js
let template = Engine.innerHTML([template]);
```
如果传递template表示设置，否则表示获取结点里面的html模板字符串。

- 获取或设置outerHTML
```js
let template = Engine.outerHTML([template]);
```
如果传递template表示设置，否则表示获取包含结点的html模板字符串。

- 属性的获取和设置
```js
let value = Engine.attr(name[, value]);
```
如果传递value表示设置，否则表示获取名称为name的属性值。

[返回首页](../README.md)