const __ = require('@yelloxing/core.js');

exports.addItemIndex = function (item, index) {

    // 孩子结点
    for (let i = 0; i < item.childNodes.length; i++) item.childNodes[i] += index;

    // 前一个结点
    if (__.isNumber(item.preNode)) item.preNode += index;

    // 后一个结点
    if (__.isNumber(item.nextNode)) item.nextNode += index;

    // 父亲结点
    if (__.isNumber(item.parentNode)) item.parentNode += index;

    return item;
};

exports.mountItem = function (targetItem, sourceItem) {

    // 孩子结点
    targetItem.childNodes = sourceItem.childNodes;

    if (sourceItem.name != 'null-engine-frame') {

        // 如果是结点
        if (sourceItem.type == 'tag') {
            targetItem.name = sourceItem.name;
            targetItem.attrs = sourceItem.attrs;
            targetItem.__tagType__ = sourceItem.__tagType__;
            if (targetItem.type == 'text') {
                delete targetItem.content;
            }
        }

        // 如果是文本
        else {
            targetItem.content = sourceItem.content;
            if (targetItem.type == 'tag') {
                delete targetItem.attrs;
                delete targetItem.name;
                delete targetItem.__tagType__;
            }
        }

        targetItem.type = sourceItem.type;

    }

};