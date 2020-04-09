let {getTemplate} = require('./tools/template');

// 获取innerHTML
exports.innerHTML = function () {
    if (this.length <= 0) throw new Error('Null pointer!');

    // 获取
    let template = "", childNodes = this.children();
    for (let i = 0; i < childNodes.length; i++) {
        template += getTemplate(childNodes.eq(i));
    }
    return template;
};

// 获取outerHTML
exports.outerHTML = function () {
    if (this.length <= 0) throw new Error('Null pointer!');
    return getTemplate(this);
};

// 属性的获取和设置
exports.attr = function (name, value) {
    if (this.length <= 0) throw new Error('Null pointer!');

    if (arguments.length > 1) {
        this.__DomTree__[this[0]].attrs[name] = value;
        return this;
    } else {
        return this.__DomTree__[this[0]].attrs[name];
    }
};
