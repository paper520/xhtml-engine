const { getTemplate, setTemplate } = require('./_template');
const __ = require('@yelloxing/core.js');
const DomTree = require('../DomTree/index');

// 获取或设置innerHTML
exports.innerHTML = function (HTMLtemplate) {
    if (this.length <= 0) throw new Error('Null pointer!');

    // 设置
    if (__.isString(HTMLtemplate)) {

        setTemplate(this, DomTree("<null-engine-frame>" + HTMLtemplate + "</null-engine-frame>"));
        return this;
    }

    // 获取
    else {
        let template = "", childNodes = this.children();
        for (let i = 0; i < childNodes.length; i++) {
            template += getTemplate(childNodes.eq(i));
        }
        return template;
    }
};

// 获取或设置outerHTML
exports.outerHTML = function (HTMLtemplate) {
    if (this.length <= 0) throw new Error('Null pointer!');

    // 设置
    if (__.isString(HTMLtemplate)) {
        setTemplate(this, DomTree(HTMLtemplate));
        return this;
    }

    // 获取
    else {
        return getTemplate(this);
    }
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