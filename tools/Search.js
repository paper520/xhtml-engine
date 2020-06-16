// 选中当前维护的第index
export function eq(index) {
  if (this.length > index) {
    return this.__new__(this.__DomTree__, [this[index]]);
  } else {
    return this.__new__(this.__DomTree__, []);
  }
};

/**
 * 提供结点查找相关方法
 * ---------------------------
 */

// 查找父亲
export function parent() {

  let pNode = null;
  if (this.length > 0) {
    pNode = this.__DomTree__[this[0]].parentNode;
  }
  return this.__new__(this.__DomTree__, pNode == null ? [] : [pNode]);

};

// 查找祖宗
export function parents() {

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
export function children() {

  let childNodes = [];
  if (this.length > 0) {
    childNodes = this.__DomTree__[this[0]].childNodes;
  }
  return this.__new__(this.__DomTree__, childNodes);

};

// 查找同胞
export function siblings() {

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
export function next() {

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
export function nextAll() {

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
export function prev() {

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
export function prevAll() {

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