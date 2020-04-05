/**
 * 提供结点查找相关方法
 * ---------------------------
 */

// 查找父亲
exports.parent = function () {

  let pNode = null;
  if (this.length > 0) {
    pNode = this.__DomTree__[this[0]].parentNode;
  }
  return this.__new__(this.__DomTree__, pNode == null ? [] : [pNode]);

};

// 查找祖宗
exports.parents = function () {

  let pNodes = [];
  if (this.length > 0) {

    let pNode = this.__DomTree__[this[0]].parentNode;
    while (pNode != null) {
      pNodes.push(pNode);
      pNode = this.__DomTree__[pNode].parentNode;
    }

  }
  return this.__new__(this.__DomTree__, pNodes);
};

// 查找孩子
exports.children = function () {

  let childNodes = [];
  if (this.length > 0) {
    childNodes = this.__DomTree__[this[0]].childNodes;
  }
  return this.__new__(this.__DomTree__, childNodes);

};

// 查找同胞
exports.siblings = function () {

  let siblingNodes = [];
  if (this.length > 0) {

    siblingNodes = [this[0]];

    // 寻找前面的同胞
    let preSibling = this.__DomTree__[this[0]].preNode;
    while (preSibling != null) {
      siblingNodes.unshift(preSibling);
      preSibling = this.__DomTree__[preSibling].preNode;
    }

    // 寻找后面的同胞
    let nextSibling = this.__DomTree__[this[0]].nextNode;
    while (nextSibling != null) {
      siblingNodes.push(nextSibling);
      nextSibling = this.__DomTree__[nextSibling].nextNode;
    }

  }
  return this.__new__(this.__DomTree__, siblingNodes);

};

// 下一个兄弟
exports.next = function () {

  let siblingNode = [];
  if (this.length > 0) {

    // 寻找后面的第一个同胞
    let nextSibling = this.__DomTree__[this[0]].nextNode;
    if (nextSibling != null) {
      siblingNode.push(nextSibling);
    }

  }
  return this.__new__(this.__DomTree__, siblingNode);

};

// 后续全部兄弟
exports.nextAll = function () {

  let siblingNodes = [];
  if (this.length > 0) {

    // 寻找后面的同胞
    let nextSibling = this.__DomTree__[this[0]].nextNode;
    while (nextSibling != null) {
      siblingNodes.push(nextSibling);
      nextSibling = this.__DomTree__[nextSibling].nextNode;
    }

  }
  return this.__new__(this.__DomTree__, siblingNodes);
};

// 前一个兄弟
exports.prev = function () {

  let siblingNode = [];
  if (this.length > 0) {

    // 寻找前面的第一个同胞
    let preSibling = this.__DomTree__[this[0]].preNode;
    if (preSibling != null) {
      siblingNode.unshift(preSibling);
    }

  }
  return this.__new__(this.__DomTree__, siblingNode);

};

// 前置全部兄弟
exports.prevAll = function () {

  let siblingNodes = [];
  if (this.length > 0) {

    // 寻找前面的同胞
    let preSibling = this.__DomTree__[this[0]].preNode;
    while (preSibling != null) {
      siblingNodes.unshift(preSibling);
      preSibling = this.__DomTree__[preSibling].preNode;
    }

  }
  return this.__new__(this.__DomTree__, siblingNodes);
};