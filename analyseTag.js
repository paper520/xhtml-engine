const { blanksReg } = require('./RegExp');

module.exports = function (attrString) {
  let attr = {}, index = 0;

  attrString = attrString.trim();

  let getOneAttr = function () {

    let attrName = "", attrValue = "";

    // 先寻找属性名
    for (; index < attrString.length; index++) {
      if (blanksReg.test(attrString[index]) || index == attrString.length - 1) {

        attrName += attrString[index];

        if (!blanksReg.test(attrName)) {
          attr[attrName.trim()] = "";
        }
        index += 1;
        break;

      } else if (attrString[index] == '=') {

        // 接着寻找属性值
        index += 1;
        let preCode = null, preLeng = -1;
        if (attrString.substr(index, 1) == '"' || attrString.substr(index, 1) == "'") {
          preCode = attrString.substr(index, 1);
          preLeng = 1;
          index += 1;
        } else if (attrString.substr(index, 2) == '\"' || attrString.substr(index, 2) == "\'") {
          preCode = attrString.substr(index, 2);
          preLeng = 2;
          index += 2;
        }

        if (preCode !== null) {

          for (; index < attrString.length; index++) {
            if (attrString.substr(index, preLeng) == preCode) {
              attr[attrName.trim()] = attrValue.trim();
              index += 2;
              break;
            } else {
              attrValue += attrString[index];
            }
          }

        } else {
          for (; index < attrString.length; index++) {
            if (blanksReg.test(attrString[index])) {
              attr[attrName.trim()] = attrValue.trim();
              index += 1;
              break;
            } else {
              attrValue += attrString[index];
            }
          }
        }

        break;

      } else {
        attrName += attrString[index];
      }
    }

    // 如果还有字符串，继续解析
    if (index < attrString.length) {
      getOneAttr();
    }

  };

  getOneAttr();

  return attr;
};