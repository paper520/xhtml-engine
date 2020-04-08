let getTemplate = require('./tools/getTemplate');

// 获取innerHTML
exports.innerHTML = function () {
    let template = "", childNodes = this.children();
    for (let i = 0; i < childNodes.length; i++) {
        template += getTemplate(childNodes.eq(i));
    }
    return template;
};

// 获取outerHTML
exports.outerHTML = function () {
    return getTemplate(this);
};