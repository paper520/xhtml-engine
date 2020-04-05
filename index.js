let Engine = function (template, indexs) {
  return new Engine.prototype.init(template, indexs);
};

Engine.prototype.init = function (template, indexs) {

  // 维护内置的tree
  this.__DomTree__ = require('@yelloxing/core.js').isArray(template) ? template : require('./DomTree/index')(template);

  // 记录当前查询到的结点
  if (require('@yelloxing/core.js').isArray(indexs)) {
    for (let i = 0; i < indexs.length; i++) this[i] = indexs[i];
    this.length = indexs.length;
  } else {
    this[0] = 0;
    this.length = 1;
  }

  return this;

};

Engine.prototype.__new__ = function (template, indexs) {
  return Engine(template, indexs);
};

// 扩展引擎方法
Engine.prototype.extend = function (source) {
  for (let key in source) this[key] = source[key];
  return this;
};

Engine.prototype.valueOf = function () {
  if (this.length <= 0) {
    return null;
  } else {
    let tag = this.__DomTree__[this[0]];
    return tag.type == 'text' ? tag.content : {
      tagName: tag.name,
      attrs: tag.attrs
    };
  }
};

Engine.prototype.toString = function () {

  let str = "[";
  for (let i = 0; i < this.length; i++) {
    let value = Engine(this.__DomTree__, [this[i]]).valueOf();
    str += (require('@yelloxing/core.js').isString(value) ? value : JSON.stringify(value)) + ",";
  }
  return str.replace(/,$/, '') + "]";
};

/**
 * 扩展原型方法
 * -------------------------
 */

const { parent, parents, children, siblings, next, nextAll, prev, prevAll, eq } = require('./search');

Engine.prototype.extend({

  // 查找方法
  parent, parents, children, siblings, next, nextAll, prev, prevAll, eq

});

Engine.prototype.init.prototype = Engine.prototype;

module.exports = Engine;