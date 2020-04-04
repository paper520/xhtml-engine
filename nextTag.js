const analyseTag = require('./analyseTag');
const { blankReg, blanksReg } = require('./RegExp');

module.exports = function (template) {

    let i = -1,

        // 当前面对的字符
        currentChar = null;

    // 获取下一个字符
    let next = function () {
        currentChar = i++ < template.length - 1 ? template[i] : null;
        return currentChar;
    };

    // 获取往后n个值
    let nextNValue = function (n) {
        return template.substring(i, n + i > template.length ? template.length : n + i);
    };

    next();
    // 剔除开头的空白
    while (blankReg.test(currentChar) && i < template.length - 1) next();


    /**
     * 一个Tag存在哪些类型？如下：
     * 1.<tag-name>       { tagName:'tag-name', type:'beginTag', attrs:{} }      开始标签
     * 2.</tag-name>      { tagName:'tag-name', type:'endTag'   }                结束标签
     * 3.<tag-name />     { tagName:'tag-name', type:'fullTag',  attrs:{} }      自闭合标签
     * 4.text             { tagName:'text',     type:'textcode' }                文本结点
     * 5.<!-- text -->    { tagName:'text',     type:'comment'  }                注释
     * 6.<!DOCTYPE text>  { tagName:'text',     type:'DOCTYPE'  }                声明
     * 
     * 
     */
    return function () {

        let tag = currentChar, tagObj = {};

        // 如果前面是获取的js或css，还有pre开始标签，比较特殊，直接寻址闭合的
        preIsScript = false, preIsStyle = false; preIsPre = false;

        if (tag == null) return null;

        // 针对特殊的comment
        if (nextNValue(4) == '<!--') {
            tagObj.type = 'comment';
            tagObj.tagName = tag;
            while (nextNValue(3) != '-->') {
                tagObj.tagName += next();
            }
            next(); next(); next();
            tagObj.tagName = tagObj.tagName.replace(/^<!--/, '').replace(/-$/, '');
            return tagObj;
        }

        // 针对特殊的doctype
        if (nextNValue(9) == '<!DOCTYPE') {
            tagObj.type = 'DOCTYPE';
            tagObj.tagName = tag;
            while (nextNValue(1) != '>') {
                tagObj.tagName += next();
            }
            next();
            tagObj.tagName = tagObj.tagName.replace(/^<!DOCTYPE/, '').replace(/>$/, '');
            return tagObj;
        }

        // 如果是获取script里面的内容
        // 先不考虑里面包含'</script>'
        if (preIsScript) {
            tagObj.type = 'textcode';
            tagObj.tagName = tag;
            while (nextNValue(9) != '</script>') {
                tagObj.tagName += next();
            }
        }

        // 如果是获取style里面的内容
        // 先不考虑里面包含'</style>'
        else if (preIsStyle) {
            tagObj.type = 'textcode';
            tagObj.tagName = tag;
            while (nextNValue(8) != '</style>') {
                tagObj.tagName += next();
            }
        }

        // 如果是期望归结非文本结点
        // 如果标签中包含>的先忽略考虑
        else if (tag == '<') {
            while (currentChar != '>') {
                tag += next();
            }

            // 针对特殊的结束标签
            if (/^<\//.test(tag)) {
                tagObj.tagName = tag.replace(/^<\//, '').replace(/>$/, '');
                tagObj.type = 'endTag';
            } else {

                if (/\/>$/.test(tag)) {
                    tagObj.type = 'fullTag';
                    tag = tag.replace(/\/>$/, '');
                } else {
                    tagObj.type = 'beginTag';
                    tag = tag.replace(/>$/, '');
                }

                tag = tag.replace(/^</, '');

                tagObj.tagName = "";
                let i = 0;
                for (; i < tag.length; i++) {
                    if (tag[i] == ' ') break;
                    tagObj.tagName += tag[i];
                }

                let attrString = tag.substring(i);
                if (blanksReg.test(attrString)) {
                    tagObj.attrs = {};
                } else {
                    tagObj.attrs = analyseTag(attrString);
                }

            }

        }

        // 如果是归结文本结点
        // 如果文本中包含<的先忽略考虑
        else {
            tagObj.type = 'textcode';
            tagObj.tagName = currentChar;
            while (nextNValue(1) != '<') {
                tagObj.tagName += next();
            }
            tagObj.tagName = tagObj.tagName.replace(/<$/, '');
            i -= 1;
        }


        // 如果遇到开始script或者style、pre标记开始获取特殊文本
        if (tagObj.type == 'beginTag') {
            if ((tagObj.tagName + "").toLowerCase() == 'script') {
                preIsScript = true;
            } else if ((tagObj.tagName + "").toLowerCase() == 'style') {
                preIsStyle = true;
            } else if ((tagObj.tagName + "").toLowerCase() == 'pre') {
                preIsPre = true;
            }

        }

        // 如果遇到结束script或者style、pre标记结束获取特殊文本
        else if (tagObj.type == 'endTag') {
            if ((tagObj.tagName + "").toLowerCase() == 'script') {
                preIsScript = false;
            } else if ((tagObj.tagName + "").toLowerCase() == 'style') {
                preIsStyle = false;
            } else if ((tagObj.tagName + "").toLowerCase() == 'pre') {
                preIsPre = false;
            }
        }

        next();

        return tagObj;

    };

}; 