"use strict";

function _toConsumableArray2(arr) { return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread2(); }

function _nonIterableSpread2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray2(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/*!
* xhtml-engine v2.0.0
* (c) 2020-2020 心叶 git+https://github.com/yelloxing/xhtml-engine.git
* License: MIT
*/
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, (global['xhtml-engine'] = global['xhtml-engine'] || {}, global['xhtml-engine'].rollup = factory()));
})(void 0, function () {
  'use strict';

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var core_min = createCommonjsModule(function (module) {
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _construct(Parent, args, Class) {
      if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
      } else {
        _construct = function _construct(Parent, args, Class) {
          var a = [null];
          a.push.apply(a, args);
          var Constructor = Function.bind.apply(Parent, a);
          var instance = new Constructor();
          if (Class) _setPrototypeOf(instance, Class.prototype);
          return instance;
        };
      }

      return _construct.apply(null, arguments);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }
    }

    function _typeof(obj) {
      if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
        _typeof = function _typeof(obj) {
          return _typeof2(obj);
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
        };
      }

      return _typeof(obj);
    }

    (function () {
      var _dictionary;

      var MAX_SAFE_INTEGER = 9007199254740991;

      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }

      function isArrayLike(value) {
        return value != null && typeof value != "function" && isLength(value.length);
      }

      var toString = Object.prototype.toString;

      function getType(value) {
        if (value == null) {
          return value === undefined ? "[object Undefined]" : "[object Null]";
        }

        return toString.call(value);
      }

      function isString(value) {
        var type = _typeof(value);

        return type === "string" || type === "object" && value != null && !Array.isArray(value) && getType(value) === "[object String]";
      }

      function isArraySpec(value) {
        return isArrayLike(value) && !isString(value);
      }

      var concat = function concat(newArray, values) {
        if (!isArraySpec(values)) {
          return newArray.push(values);
        }

        for (var i = 0; i < values.length; i++) {
          if (isArraySpec(values[i])) {
            if (values[i].length > 1) {
              concat(newArray, values[i]);
            } else if (values[i].length === 1) {
              concat(newArray, values[i][0]);
            }
          } else {
            newArray.push(values[i]);
          }
        }
      };

      function concat$1() {
        var values = [];

        for (var i = 0; i < arguments.length; i++) {
          values.push(arguments[i]);
        }

        var newArray = [];
        concat(newArray, values);
        return newArray;
      }

      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }

      function indexOf(array, value, fromIndex) {
        if (!isArrayLike(array)) {
          return -1;
        }

        if (!isLength(fromIndex) || fromIndex < 0) {
          fromIndex = 0;
        }

        for (; fromIndex < array.length; fromIndex++) {
          if (eq(array[fromIndex], value)) {
            return fromIndex;
          }
        }

        return -1;
      }

      function lastIndexOf(array, value, fromIndex) {
        if (!isArrayLike(array)) {
          return -1;
        }

        if (!isLength(fromIndex) || fromIndex > array.length - 1) {
          fromIndex = array.length - 1;
        }

        for (; fromIndex > -1; fromIndex--) {
          if (eq(array[fromIndex], value)) {
            return fromIndex;
          }
        }

        return -1;
      }

      function unique(array) {
        if (!isArraySpec(array)) {
          return array;
        }

        if (array.length === 0) {
          return [];
        }

        if (array.length === 1) {
          return [array[0]];
        }

        var newArray = [],
            help = _construct(Array, _toConsumableArray(array));

        while (help.length > 0) {
          newArray.push(help[0]);
          var value = help[0],
              j = -1;

          for (var i = 1; i < help.length; i++) {
            if (!eq(value, help[i])) {
              help[j + 1] = help[i];
              j += 1;
            }
          }

          help.length = j + 1;
        }

        return newArray;
      }

      function isSymbol(value) {
        var type = _typeof(value);

        return type === "symbol" || type === "object" && value !== null && getType(value) === "[object Symbol]";
      }

      var symbolToString = Symbol.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var INFINITY = 1 / 0;

      function toString$1(value) {
        if (value == null) {
          return "";
        }

        if (typeof value === "string") {
          return value;
        }

        if (isString(value)) {
          return value + "";
        }

        if (Array.isArray(value)) {
          var _temp = [];

          for (var i = 0; i < value.length; i++) {
            _temp[i] = toString$1(value[i]);
          }

          return "[".concat(_temp, "]");
        }

        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }

        var temp = "";

        for (var key in value) {
          if (hasOwnProperty.call(value, key)) temp += ',"' + toString$1(key) + '":' + toString$1(value[key]);
        }

        if (temp !== "") {
          temp = temp.replace(/^,/, "");
          return "{" + temp + "}";
        }

        var result = "".concat(value);
        return result === "0" && 1 / value === -INFINITY ? "-0" : result;
      }

      function isArray(value, notStrict) {
        if (notStrict) {
          return isArraySpec(value);
        }

        return Array.isArray(value);
      }

      function isObject(value) {
        var type = _typeof(value);

        return value != null && (type === "object" || type === "function");
      }

      function isBoolean(value) {
        return value === true || value === false || value !== null && _typeof(value) === "object" && getType(value) === "[object Boolean]";
      }

      function isPlainObject(value) {
        if (value === null || _typeof(value) !== "object" || getType(value) != "[object Object]") {
          return false;
        }

        if (Object.getPrototypeOf(value) === null) {
          return true;
        }

        var proto = value;

        while (Object.getPrototypeOf(proto) !== null) {
          proto = Object.getPrototypeOf(proto);
        }

        return Object.getPrototypeOf(value) === proto;
      }

      function isElement(value) {
        return value !== null && _typeof(value) === "object" && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
      }

      function isText(value) {
        return value !== null && _typeof(value) === "object" && value.nodeType === 3 && !isPlainObject(value);
      }

      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }

        var type = getType(value);
        return type === "[object Function]" || type === "[object AsyncFunction]" || type === "[object GeneratorFunction]" || type === "[object Proxy]";
      }

      function isError(value) {
        if (value === null || _typeof(value) !== "object") {
          return false;
        }

        var type = getType(value);
        return type === "[object Error]" || type === "[object DOMException]" || typeof value.message === "string" && typeof value.name === "string" && !isPlainObject(value);
      }

      function isNull(value) {
        return value === null;
      }

      function isNumber(value) {
        return typeof value === "number" || value !== null && _typeof(value) === "object" && getType(value) === "[object Number]";
      }

      function isUndefined(value) {
        return value === undefined;
      }

      function max(array, valback) {
        if (!isArrayLike(array) || array.length < 1) {
          return undefined;
        }

        if (valback) {
          var maxIndex = 0,
              maxValue = valback(array[0], 0),
              temp;

          for (var index = 1; index < array.length; index++) {
            temp = valback(array[index], index);

            if (temp > maxValue) {
              maxValue = temp;
              maxIndex = index;
            }
          }

          return array[maxIndex];
        } else {
          var _maxIndex = 0;

          for (var _index = 1; _index < array.length; _index++) {
            if (array[_index] > array[_maxIndex]) {
              _maxIndex = _index;
            }
          }

          return array[_maxIndex];
        }
      }

      function min(array, valback) {
        if (!isArrayLike(array) || array.length < 1) {
          return undefined;
        }

        if (valback) {
          var minIndex = 0,
              minValue = valback(array[0], 0),
              temp;

          for (var index = 1; index < array.length; index++) {
            temp = valback(array[index], index);

            if (temp < minValue) {
              minValue = temp;
              minIndex = index;
            }
          }

          return array[minIndex];
        } else {
          var _minIndex = 0;

          for (var _index2 = 1; _index2 < array.length; _index2++) {
            if (array[_index2] < array[_minIndex]) {
              _minIndex = _index2;
            }
          }

          return array[_minIndex];
        }
      }

      function isKey(value, object) {
        if (Array.isArray(value)) {
          return false;
        }

        var type = _typeof(value);

        if (type == "number" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }

        return object !== null && value in Object(object) || /^\w*$/.test(value);
      }

      function stringToPath(value) {
        return value.replace(/\[/g, ".").replace(/\]/g, "").replace(/"/g, "").replace(/'/g, "").split(".");
      }

      function castPath(value, object) {
        if (Array.isArray(value)) {
          return value;
        }

        return isKey(value, object) ? [value] : stringToPath(value);
      }

      var INFINITY$1 = 1 / 0;

      function toKey(value) {
        if (typeof value === "string" || isSymbol(value)) {
          return value;
        }

        var result = "".concat(value);
        return result === "0" && 1 / value === -INFINITY$1 ? "-0" : result;
      }

      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0;

        for (; index < path.length && object !== null; index++) {
          object = object[toKey(path[index])];
        }

        return index && index === path.length ? object : undefined;
      }

      function get(object, path, defaultValue) {
        var result = object == null ? undefined : baseGet(object, path);
        return result === undefined ? defaultValue : result;
      }

      function baseAssignValue(object, key, value) {
        if (key == "__proto__") {
          Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value: value,
            writable: true
          });
        } else {
          object[key] = value;
        }
      }

      function assignValue(object, key, value) {
        baseAssignValue(object, key, value);
      }

      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }

        path = castPath(path, object);
        var nested = object;

        for (var index = 0; index < path.length; index++) {
          var key = toKey(path[index]);
          var newValue = value;

          if (index + 1 != path.length) {
            var objValue = nested[key];

            if (!isObject(objValue)) {
              newValue = customizer ? customizer(objValue, key, nested) : undefined;

              if (newValue === undefined) {
                newValue = {};
              }
            } else {
              newValue = objValue;
            }
          }

          assignValue(nested, key, newValue);
          nested = nested[key];
        }

        return object;
      }

      function set(object, path, value, customizer) {
        customizer = typeof customizer === "function" ? customizer : undefined;
        return object == null ? object : baseSet(object, path, value, customizer);
      }

      function split(str, splitStr) {
        str = toString$1(str);
        var resultArray = [],
            temp = str.split(splitStr);

        for (var i = 0; i < temp.length; i++) {
          temp[i] = temp[i].trim();

          if (temp[i] != "") {
            resultArray.push(temp[i]);
          }
        }

        return resultArray;
      }

      var $timers = [];
      var $interval = 13;
      var $speeds = 400;
      var $timerId = null;

      function animation(doback, duration, callback) {
        var clock = {
          timer: function timer(tick, duration, callback) {
            if (!tick) {
              throw new Error("Tick is required!");
            }

            duration = duration || $speeds;
            var id = new Date().valueOf() + "_" + (Math.random() * 1e3).toFixed(0);
            $timers.push({
              id: id,
              createTime: new Date(),
              tick: tick,
              duration: duration,
              callback: callback
            });
            clock.start();
            return id;
          },
          start: function start() {
            if (!$timerId) {
              $timerId = setInterval(clock.tick, $interval);
            }
          },
          tick: function tick() {
            var createTime,
                flag,
                tick,
                callback,
                timer,
                duration,
                passTime,
                timers = $timers;
            $timers = [];
            $timers.length = 0;

            for (flag = 0; flag < timers.length; flag++) {
              timer = timers[flag];
              createTime = timer.createTime;
              tick = timer.tick;
              duration = timer.duration;
              callback = timer.callback;
              passTime = (+new Date() - createTime) / duration;
              passTime = passTime > 1 ? 1 : passTime;
              tick(passTime);

              if (passTime < 1 && timer.id) {
                $timers.push(timer);
              } else if (callback) {
                callback(passTime);
              }
            }

            if ($timers.length <= 0) {
              clock.stop();
            }
          },
          stop: function stop() {
            if ($timerId) {
              clearInterval($timerId);
              $timerId = null;
            }
          }
        };
        var id = clock.timer(function (deep) {
          doback(deep);
        }, duration, callback);
        return function () {
          var i;

          for (i in $timers) {
            if ($timers[i].id == id) {
              $timers[i].id = undefined;
              return;
            }
          }
        };
      }

      function initConfig(init, data) {
        for (var key in data) {
          try {
            init[key] = data[key];
          } catch (e) {
            throw new Error("Illegal property value！");
          }
        }

        return init;
      }

      function Hermite(config) {
        config = initConfig({
          u: .5
        }, config);
        var MR, a, b;

        var hermite = function hermite(x) {
          if (MR) {
            var sx = (x - a) / (b - a),
                sx2 = sx * sx,
                sx3 = sx * sx2;
            var sResult = sx3 * MR[0] + sx2 * MR[1] + sx * MR[2] + MR[3];
            return sResult * (b - a);
          } else throw new Error("You shoud first set the position!");
        };

        hermite.setP = function (x1, y1, x2, y2, s1, s2) {
          if (x1 < x2) {
            a = x1;
            b = x2;
            var p3 = config.u * s1,
                p4 = config.u * s2;
            y1 /= x2 - x1;
            y2 /= x2 - x1;
            MR = [2 * y1 - 2 * y2 + p3 + p4, 3 * y2 - 3 * y1 - 2 * p3 - p4, p3, y1];
          } else throw new Error("The point x-position should be increamented!");

          return hermite;
        };

        return hermite;
      }

      var dictionary = (_dictionary = {
        48: [0, ")"],
        49: [1, "!"],
        50: [2, "@"],
        51: [3, "#"],
        52: [4, "$"],
        53: [5, "%"],
        54: [6, "^"],
        55: [7, "&"],
        56: [8, "*"],
        57: [9, "("],
        96: [0, 0],
        97: 1,
        98: 2,
        99: 3,
        100: 4,
        101: 5,
        102: 6,
        103: 7,
        104: 8,
        105: 9,
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        65: ["a", "A"],
        66: ["b", "B"],
        67: ["c", "C"],
        68: ["d", "D"],
        69: ["e", "E"],
        70: ["f", "F"],
        71: ["g", "G"],
        72: ["h", "H"],
        73: ["i", "I"],
        74: ["j", "J"],
        75: ["k", "K"],
        76: ["l", "L"],
        77: ["m", "M"],
        78: ["n", "N"],
        79: ["o", "O"],
        80: ["p", "P"],
        81: ["q", "Q"],
        82: ["r", "R"],
        83: ["s", "S"],
        84: ["t", "T"],
        85: ["u", "U"],
        86: ["v", "V"],
        87: ["w", "W"],
        88: ["x", "X"],
        89: ["y", "Y"],
        90: ["z", "Z"],
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        33: "page up",
        34: "page down",
        35: "end",
        36: "home",
        16: "shift",
        17: "ctrl",
        18: "alt",
        91: "command",
        92: "command",
        93: "command",
        9: "tab",
        20: "caps lock",
        32: "spacebar",
        8: "backspace",
        13: "enter",
        27: "esc",
        46: "delete",
        45: "insert",
        144: "number lock",
        145: "scroll lock",
        12: "clear"
      }, _defineProperty(_dictionary, "45", "insert"), _defineProperty(_dictionary, 19, "pause"), _defineProperty(_dictionary, 112, "f1"), _defineProperty(_dictionary, 113, "f2"), _defineProperty(_dictionary, 114, "f3"), _defineProperty(_dictionary, 115, "f4"), _defineProperty(_dictionary, 116, "f5"), _defineProperty(_dictionary, 117, "f6"), _defineProperty(_dictionary, 118, "f7"), _defineProperty(_dictionary, 119, "f8"), _defineProperty(_dictionary, 120, "f9"), _defineProperty(_dictionary, 121, "f10"), _defineProperty(_dictionary, 122, "f11"), _defineProperty(_dictionary, 123, "f12"), _defineProperty(_dictionary, 189, ["-", "_"]), _defineProperty(_dictionary, 187, ["=", "+"]), _defineProperty(_dictionary, 219, ["[", "{"]), _defineProperty(_dictionary, 221, ["]", "}"]), _defineProperty(_dictionary, 220, ["\\", "|"]), _defineProperty(_dictionary, 186, [";", ":"]), _defineProperty(_dictionary, 222, ["'", '"']), _defineProperty(_dictionary, 188, [",", "<"]), _defineProperty(_dictionary, 190, [".", ">"]), _defineProperty(_dictionary, 191, ["/", "?"]), _defineProperty(_dictionary, 192, ["`", "~"]), _dictionary);
      var help_key = ["shift", "ctrl", "alt"];

      function keyString(event) {
        event = event || window.event;
        var keycode = event.keyCode || event.which;
        var key = dictionary[keycode] || keycode;
        if (!key) return;
        if (key.constructor !== Array) key = [key, key];
        var shift = event.shiftKey ? "shift+" : "",
            alt = event.altKey ? "alt+" : "",
            ctrl = event.ctrlKey ? "ctrl+" : "";
        var resultKey = "",
            preKey = ctrl + shift + alt;

        if (help_key.indexOf(key[0]) >= 0) {
          key[0] = key[1] = "";
        }

        var lockPress = event.code == "Key" + event.key && !shift;
        resultKey = preKey + (preKey == "" && lockPress ? key[1] : key[0]);

        if (key[0] == "") {
          resultKey = resultKey.replace(/\+$/, "");
        }

        return resultKey;
      }

      function _move(d, a, b, c) {
        c = c || 0;
        var sqrt = Math.sqrt(a * a + b * b + c * c);
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a * d / sqrt, b * d / sqrt, c * d / sqrt, 1];
      }

      function _rotate(deg) {
        var sin = Math.sin(deg),
            cos = Math.cos(deg);
        return [cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      }

      function _scale(xTimes, yTimes, zTimes, cx, cy, cz) {
        cx = cx || 0;
        cy = cy || 0;
        cz = cz || 0;
        return [xTimes, 0, 0, 0, 0, yTimes, 0, 0, 0, 0, zTimes, 0, cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1];
      }

      function _transform(a1, b1, c1, a2, b2, c2) {
        if (typeof a1 === "number" && typeof b1 === "number") {
          if (typeof c1 !== "number") {
            c1 = 0;
            a2 = a1;
            b2 = b1;
            c2 = 1;
          } else if (typeof a2 !== "number" || typeof b2 !== "number" || typeof c2 !== "number") {
            a2 = a1;
            b2 = b1;
            c2 = c1;
            a1 = 0;
            b1 = 0;
            c1 = 0;
          }

          if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error("It's not a legitimate ray!");
          var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
              cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
              sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,
              b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
              c = c2 - c1,
              sqrt2 = Math.sqrt(b * b + c * c),
              cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
              sin2 = sqrt2 != 0 ? b / sqrt2 : 0;
          return [[cos1, cos2 * sin1, sin1 * sin2, 0, -sin1, cos1 * cos2, cos1 * sin2, 0, 0, -sin2, cos2, 0, b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1], [cos1, -sin1, 0, 0, cos2 * sin1, cos2 * cos1, -sin2, 0, sin1 * sin2, cos1 * sin2, cos2, 0, a1, b1, c1, 1]];
        } else {
          throw new Error("a1 and b1 is required!");
        }
      }

      var _multiply = function _multiply(matrix4, param) {
        var newParam = [];

        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < param.length / 4; j++) {
            newParam[j * 4 + i] = matrix4[i] * param[j * 4] + matrix4[i + 4] * param[j * 4 + 1] + matrix4[i + 8] * param[j * 4 + 2] + matrix4[i + 12] * param[j * 4 + 3];
          }
        }

        return newParam;
      };

      function Matrix4(initMatrix4) {
        var matrix4 = initMatrix4 || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        var matrix4Obj = {
          move: function move(dis, a, b, c) {
            matrix4 = _multiply(_move(dis, a, b, c), matrix4);
            return matrix4Obj;
          },
          rotate: function rotate(deg, a1, b1, c1, a2, b2, c2) {
            var matrix4s = _transform(a1, b1, c1, a2, b2, c2);

            matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
            return matrix4Obj;
          },
          scale: function scale(xTimes, yTimes, zTimes, cx, cy, cz) {
            matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
            return matrix4Obj;
          },
          multiply: function multiply(newMatrix4, flag) {
            matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
            return matrix4Obj;
          },
          use: function use(x, y, z, w) {
            z = z || 0;
            w = w || 1;

            var temp = _multiply(matrix4, [x, y, z, w]);

            temp[0] = +temp[0].toFixed(7);
            temp[1] = +temp[1].toFixed(7);
            temp[2] = +temp[2].toFixed(7);
            temp[3] = +temp[3].toFixed(7);
            return temp;
          },
          value: function value() {
            return matrix4;
          }
        };
        return matrix4Obj;
      }

      function tree(_config) {
        var config = _config || {},
            alltreedata,
            rootid;

        var update = function update() {
          var beforeDis = [],
              size = 0,
              maxDeep = 0;

          (function positionCalc(pNode, deep) {
            if (deep > maxDeep) maxDeep = deep;
            var flag;

            for (flag = 0; flag < pNode.children.length; flag++) {
              positionCalc(alltreedata[pNode.children[flag]], deep + 1);
            }

            alltreedata[pNode.id].left = deep + .5;

            if (flag == 0) {
              if (beforeDis[deep] == undefined) beforeDis[deep] = -.5;
              if (beforeDis[deep - 1] == undefined) beforeDis[deep - 1] = -.5;
              alltreedata[pNode.id].top = beforeDis[deep] + 1;
              var pTop = beforeDis[deep] + 1 + (alltreedata[pNode.pid].children.length - 1) * .5;
              if (pTop - 1 < beforeDis[deep - 1]) alltreedata[pNode.id].top = beforeDis[deep - 1] + 1 - (alltreedata[pNode.pid].children.length - 1) * .5;
            } else {
              alltreedata[pNode.id].top = (alltreedata[pNode.children[0]].top + alltreedata[pNode.children[flag - 1]].top) * .5;
            }

            if (alltreedata[pNode.id].top <= beforeDis[deep]) {
              var needUp = beforeDis[deep] + 1 - alltreedata[pNode.id].top;

              (function doUp(_pid, _deep) {
                alltreedata[_pid].top += needUp;
                if (beforeDis[_deep] < alltreedata[_pid].top) beforeDis[_deep] = alltreedata[_pid].top;

                var _flag;

                for (_flag = 0; _flag < alltreedata[_pid].children.length; _flag++) {
                  doUp(alltreedata[_pid].children[_flag], _deep + 1);
                }
              })(pNode.id, deep);
            }

            beforeDis[deep] = alltreedata[pNode.id].top;
            if (alltreedata[pNode.id].top + .5 > size) size = alltreedata[pNode.id].top + .5;
          })(alltreedata[rootid], 0);

          return {
            node: alltreedata,
            root: rootid,
            size: size,
            deep: maxDeep + 1
          };
        };

        var toInnerTree = function toInnerTree(initTree) {
          var tempTree = {};
          var temp = config.root(initTree),
              id,
              rid;
          id = rid = config.id(temp);
          tempTree[id] = {
            data: temp,
            pid: null,
            id: id,
            children: []
          };

          (function createTree(pdata, pid) {
            var children = config.child(pdata, initTree),
                flag;

            for (flag = 0; children && flag < children.length; flag++) {
              id = config.id(children[flag]);
              tempTree[pid].children.push(id);
              tempTree[id] = {
                data: children[flag],
                pid: pid,
                id: id,
                children: []
              };
              createTree(children[flag], id);
            }
          })(temp, id);

          return [rid, tempTree];
        };

        var tree = function tree(initTree) {
          var treeData = toInnerTree(initTree);
          alltreedata = treeData[1];
          rootid = treeData[0];
          return update();
        };

        tree.root = function (rootback) {
          config.root = rootback;
          return tree;
        };

        tree.child = function (childback) {
          config.child = childback;
          return tree;
        };

        tree.id = function (idback) {
          config.id = idback;
          return tree;
        };

        return tree;
      }

      var __ = {
        concat: concat$1,
        indexOf: indexOf,
        lastIndexOf: lastIndexOf,
        unique: unique,
        eq: eq,
        toString: toString$1,
        isObject: isObject,
        isSymbol: isSymbol,
        isString: isString,
        isBoolean: isBoolean,
        isElement: isElement,
        isText: isText,
        isFunction: isFunction,
        isError: isError,
        isNull: isNull,
        isNumber: isNumber,
        isUndefined: isUndefined,
        isArray: isArray,
        max: max,
        min: min,
        get: get,
        set: set,
        split: split,
        animation: animation,
        Hermite: Hermite,
        keyString: keyString,
        Matrix4: Matrix4,
        tree: tree
      };

      if (_typeof(module) === "object" && _typeof(module.exports) === "object") {
        module.exports = __;
      } else {
        var $__ = window.__;

        __.noConflict = function (deep) {
          if (window.__ === __) {
            window.__ = $__;
          }

          return __;
        };

        window.__ = __;
      }
    })();
  });
  var _RegExp = {
    // 空白字符:http://www.w3.org/TR/css3-selectors/#whitespace
    blankReg: new RegExp("[\\x20\\t\\r\\n\\f]"),
    blanksReg: /^[\x20\t\r\n\f]{0,}$/
  };
  var blanksReg = _RegExp.blanksReg; // 分析结点的属性

  var analyseTag = function analyseTag(attrString) {
    var attr = {},
        index = 0;
    attrString = attrString.trim();

    var getOneAttr = function getOneAttr() {
      // 属性名和属性值
      var attrName = "",
          attrValue = ""; // 先寻找属性名

      for (; index < attrString.length; index++) {
        // 寻找属性名的时候遇到空白或结尾的时候，肯定没有属性值
        if (blanksReg.test(attrString[index]) || index == attrString.length - 1) {
          attrName += attrString[index]; // 如果属性名是空白，就不需要记录了

          if (!blanksReg.test(attrName)) {
            attr[attrName.trim()] = "";
          }

          index += 1;
          break;
        } // 如果遇到等号，说明属性名寻找结束了
        else if (attrString[index] == '=') {
            // 接着寻找属性值
            index += 1; // 由于属性可能由引号包裹或直接暴露

            var preCode = null,
                preLeng = -1; // 如果是由'或者"包裹

            if (attrString.substr(index, 1) == '"' || attrString.substr(index, 1) == "'") {
              preCode = attrString.substr(index, 1);
              preLeng = 1;
              index += 1;
            } // 如果是由\'或\"包裹
            else if (attrString.substr(index, 2) == '\"' || attrString.substr(index, 2) == "\'") {
                preCode = attrString.substr(index, 2);
                preLeng = 2;
                index += 2;
              } // 开始正式寻找属性值
            // 如果没有包裹，是直接暴露在外面的
            // 我们寻找到空格或结尾即可


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
            } // 如果是包裹的
            // 我们确定寻找到对应的包裹闭合即可
            else {
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
      } // 如果还有字符串，继续解析


      if (index < attrString.length) {
        getOneAttr();
      }
    };

    getOneAttr();
    return attr;
  };

  var blankReg = _RegExp.blankReg,
      blanksReg$1 = _RegExp.blanksReg;

  var nextTag = function nextTag(template) {
    var i = -1,
        // 当前面对的字符
    currentChar = null; // 如果前面是获取的js或css，还有pre等开始标签，比较特殊，直接寻址闭合的

    var preIsSpecial = false,
        specialCode = "";
    var specialTag = ['script', 'pre', 'style', 'code']; // 获取下一个字符

    var next = function next() {
      currentChar = i++ < template.length - 1 ? template[i] : null;
      return currentChar;
    }; // 获取往后n个值


    var nextNValue = function nextNValue(n) {
      return template.substring(i, n + i > template.length ? template.length : n + i);
    };

    next(); // 剔除开头的空白

    while (blankReg.test(currentChar) && i < template.length - 1) {
      next();
    }
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
      var tag = currentChar,
          tagObj = {};
      if (tag == null) return null;
      /**
       * 特殊标签内容获取
       * ========================================
       */
      // 如果是获取特殊标签里面的内容
      // 先不考虑里面包含'</XXX>'

      if (preIsSpecial) {
        tagObj.type = 'textcode';
        tagObj.tagName = tag;

        while (nextNValue(specialCode.length + 3) != '</' + specialCode + '>' && i < template.length) {
          tagObj.tagName += next();
        }

        tagObj.tagName = tagObj.tagName.replace(/<$/, '');
        preIsSpecial = false;
        return tagObj;
      }
      /**
       * 特殊标签获取
       * ========================================
       */
      // 针对特殊的comment


      if (nextNValue(4) == '<!--') {
        tagObj.type = 'comment';
        tagObj.tagName = tag;

        while (nextNValue(3) != '-->' && i < template.length) {
          tagObj.tagName += next();
        }

        next();
        next();
        next();
        tagObj.tagName = tagObj.tagName.replace(/^<!--/, '').replace(/-$/, '');
        return tagObj;
      } // 针对特殊的doctype


      if (nextNValue(9) == '<!DOCTYPE') {
        tagObj.type = 'DOCTYPE';
        tagObj.tagName = tag;

        while (nextNValue(1) != '>' && i < template.length) {
          tagObj.tagName += next();
        }

        next();
        tagObj.tagName = tagObj.tagName.replace(/^<!DOCTYPE/, '').replace(/>$/, '');
        return tagObj;
      }
      /**
       * 普通的
       * ========================================
       */
      // 如果是期望归结非文本结点
      else if (tag == '<') {
          // 标记是否处于属性值是字符串包裹中
          var isAttrString = false,
              attrLeftValue = null,
              attrLeftLen = null; // 如果在包裹中或者没有遇到‘>’说明没有结束

          while (isAttrString || currentChar != '>' && i < template.length) {
            tag += next(); // 如果是包裹里面，试探是否即将遇到了结束

            if (isAttrString) {
              var next23Value = nextNValue(attrLeftLen + 1).substring(1);

              if (next23Value == attrLeftValue) {
                isAttrString = false;
              }
            } // 如果在包裹外面，试探是否即将进入包裹
            else {
                var _next23Value = nextNValue(2);

                if (_next23Value == '="' || _next23Value == "='") {
                  attrLeftValue = _next23Value.replace('=', '');
                  attrLeftLen = 1;
                  isAttrString = true;
                }

                _next23Value = nextNValue(3);

                if (_next23Value == '=\"' || _next23Value == "=\'") {
                  attrLeftValue = _next23Value.replace('=', '');
                  attrLeftLen = 2;
                  isAttrString = true;
                }
              }
          } // 针对特殊的结束标签


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
            var _i = 0;

            for (; _i < tag.length; _i++) {
              if (tag[_i] == ' ') break;
              tagObj.tagName += tag[_i];
            }

            var attrString = tag.substring(_i);

            if (blanksReg$1.test(attrString)) {
              tagObj.attrs = {};
            } else {
              tagObj.attrs = analyseTag(attrString);
            }
          }
        } // 如果是归结文本结点
        // 如果文本中包含<的先忽略考虑
        else {
            tagObj.type = 'textcode';
            tagObj.tagName = currentChar;

            while (nextNValue(1) != '<' && i < template.length) {
              tagObj.tagName += next();
            }

            tagObj.tagName = tagObj.tagName.replace(/<$/, '');
            i -= 1;
          } // 如果遇到开始script或者style、pre等特殊标签，标记开始获取特殊文本


      if (tagObj.type == 'beginTag') {
        if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
          preIsSpecial = true;
          specialCode = tagObj.tagName;
        }
      } // 如果遇到结束script或者style、pre等特殊标签，标记结束获取特殊文本
      else if (tagObj.type == 'endTag') {
          if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
            preIsSpecial = false;
          }
        }

      next();
      return tagObj;
    };
  }; // 分析deep
  // 我们会在这里校对那些没有结束标签的开始标签
  // 这步结束以后，每个都是一个单独的标签
  // 也就是不用再区分开始或闭合了


  var analyseDeep = function analyseDeep(tagArray) {
    // 闭合标签
    tagArray = closeTag(tagArray);
    var deep = 0,
        tagDeepArray = [];
    tagArray.forEach(function (tag) {
      if (tag.type == 'beginTag') {
        tagDeepArray.push({
          type: "tag",
          name: tag.tagName,
          attrs: tag.attrs,
          __deep__: ++deep,
          __tagType__: "double"
        });
      } else if (tag.type == 'endTag') {
        deep -= 1;
      } else if (tag.type == 'textcode') {
        // 如果是文本
        tagDeepArray.push({
          type: "text",
          content: tag.tagName,
          __deep__: deep + 1
        });
      } else if (tag.type == 'comment') {
        // 如果是注释
        tagDeepArray.push({
          type: "comment",
          content: tag.tagName,
          __deep__: deep + 1
        });
      } else {
        // 如果是自闭合结点
        tagDeepArray.push({
          type: "tag",
          name: tag.tagName,
          attrs: tag.attrs,
          __deep__: deep + 1,
          __tagType__: "single"
        });
      }
    });
    return tagDeepArray;
  }; // 标记所有没有闭合结点的直接自闭合


  var closeTag = function closeTag(tagArray) {
    var needClose = [];
    tagArray.forEach(function (tag, i) {
      if (tag.type == 'beginTag') {
        needClose.push([i, tag.tagName]);
      } else if (tag.type == 'endTag') {
        while (needClose.length > 0) {
          var needCloseTag = needClose.pop();

          if (needCloseTag[1] == tag.tagName) {
            break;
          } else {
            tagArray[needCloseTag[0]].type = 'fullTag';
          }
        }
      }
    });
    return tagArray;
  };

  var blanksReg$2 = _RegExp.blanksReg; // 获取一棵DOM树
  // noIgnore为true表示不忽略任何标签

  var DomTree = function DomTree(template, noIgnore) {
    if (!core_min.isString(template)) throw new Error("Template must be a String!"); // 获取读取下一个标签对象

    var nextTag$1 = nextTag(template);
    var tag = nextTag$1(),
        DomTree = [];

    while (tag != null) {
      if (tag.type == 'textcode' && blanksReg$2.test(tag.tagName)) ;else if (tag.type == 'DOCTYPE') ;else if (tag.type == 'comment') {
        // 注释目前也默认过滤掉，除非显示声明不忽略
        if (noIgnore) {
          DomTree.push(tag);
        }
      } else {
        DomTree.push(tag);
      }
      tag = nextTag$1();
    } // 分析层次


    DomTree = analyseDeep(DomTree);
    /**
     * 模仿浏览器构建的一棵树,每个节点有如下属性：
     * 
     * 1.parentNode index  父结点
     * 2.childNodes []     孩子结点
     * 3.preNode    index  前一个兄弟结点
     * 4.nextNode   index  后一个兄弟结点
     * 
     * 5.attrs:{}          当前结点的属性
     * 6.name              节点名称
     * 7.type              节点类型（tag和text）
     * 8.content           文本结点内容
     * 
     * 需要注意的是：如果一个文本结点内容只包含回车，tab，空格等空白字符，会直接被忽视
     */

    var presNode = [null],
        preDeep = 0;

    for (var i = 0; i < DomTree.length; i++) {
      // 当前结点
      var currentIndex = i,
          currentDeep = DomTree[i].__deep__;
      DomTree[i].childNodes = [];
      DomTree[i].preNode = null;
      DomTree[i].nextNode = null; // 前置三个结点

      var lastPre = presNode[presNode.length - 1];
      var last2Pre = presNode.length > 1 ? presNode[presNode.length - 2] : null; // 如果遇到的是兄弟结点

      if (currentDeep == preDeep) {
        // 修改兄弟关系
        DomTree[currentIndex].preNode = lastPre;
        DomTree[lastPre].nextNode = currentIndex; // 修改父子关系

        DomTree[currentIndex].parentNode = last2Pre;
        DomTree[last2Pre].childNodes.push(currentIndex); // 校对presNode

        presNode[presNode.length - 1] = currentIndex;
      } // 如果是遇到了孩子
      else if (currentDeep > preDeep) {
          // 修改兄弟关系
          // todo
          // 修改父子关系
          DomTree[currentIndex].parentNode = lastPre;
          if (lastPre != null) DomTree[lastPre].childNodes.push(currentIndex); // 校对presNode

          presNode.push(currentIndex);
        } // 如果是遇到了祖先
        else {
            var preTempIndex = presNode[presNode.length - 1 - (preDeep - currentDeep)];
            var preTemp2Index = presNode[presNode.length - 2 - (preDeep - currentDeep)]; // 修改兄弟关系

            DomTree[currentIndex].preNode = preTempIndex;
            if (preTempIndex != null) DomTree[preTempIndex].nextNode = currentIndex; // 修改父子关系

            DomTree[currentIndex].parentNode = preTemp2Index;
            if (preTemp2Index != null) DomTree[preTemp2Index].childNodes.push(currentIndex); // 校对presNode

            for (var _i2 = 0; _i2 < preDeep - currentDeep; _i2++) {
              presNode.pop();
            }

            presNode[presNode.length - 1] = currentIndex;
          }

      preDeep = currentDeep;
    }

    return DomTree;
  }; // 选中当前维护的第index


  var eq = function eq(index) {
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


  var parent = function parent() {
    var pNode = null;

    if (this.length > 0) {
      pNode = this.__DomTree__[this[0]].parentNode;
    }

    return this.__new__(this.__DomTree__, pNode == null ? [] : [pNode]);
  }; // 查找祖宗


  var parents = function parents() {
    var pNodes = [];

    if (this.length > 0) {
      var pNode = this.__DomTree__[this[0]].parentNode;

      while (pNode != null) {
        pNodes.push(pNode);
        pNode = this.__DomTree__[pNode].parentNode;
      }
    }

    return this.__new__(this.__DomTree__, pNodes);
  }; // 查找孩子


  var children = function children() {
    var childNodes = [];

    if (this.length > 0) {
      childNodes = this.__DomTree__[this[0]].childNodes;
    }

    return this.__new__(this.__DomTree__, childNodes);
  }; // 查找同胞


  var siblings = function siblings() {
    var siblingNodes = [];

    if (this.length > 0) {
      siblingNodes = [this[0]]; // 寻找前面的同胞

      var preSibling = this.__DomTree__[this[0]].preNode;

      while (preSibling != null) {
        siblingNodes.unshift(preSibling);
        preSibling = this.__DomTree__[preSibling].preNode;
      } // 寻找后面的同胞


      var nextSibling = this.__DomTree__[this[0]].nextNode;

      while (nextSibling != null) {
        siblingNodes.push(nextSibling);
        nextSibling = this.__DomTree__[nextSibling].nextNode;
      }
    }

    return this.__new__(this.__DomTree__, siblingNodes);
  }; // 下一个兄弟


  var next = function next() {
    var siblingNode = [];

    if (this.length > 0) {
      // 寻找后面的第一个同胞
      var nextSibling = this.__DomTree__[this[0]].nextNode;

      if (nextSibling != null) {
        siblingNode.push(nextSibling);
      }
    }

    return this.__new__(this.__DomTree__, siblingNode);
  }; // 后续全部兄弟


  var nextAll = function nextAll() {
    var siblingNodes = [];

    if (this.length > 0) {
      // 寻找后面的同胞
      var nextSibling = this.__DomTree__[this[0]].nextNode;

      while (nextSibling != null) {
        siblingNodes.push(nextSibling);
        nextSibling = this.__DomTree__[nextSibling].nextNode;
      }
    }

    return this.__new__(this.__DomTree__, siblingNodes);
  }; // 前一个兄弟


  var prev = function prev() {
    var siblingNode = [];

    if (this.length > 0) {
      // 寻找前面的第一个同胞
      var preSibling = this.__DomTree__[this[0]].preNode;

      if (preSibling != null) {
        siblingNode.unshift(preSibling);
      }
    }

    return this.__new__(this.__DomTree__, siblingNode);
  }; // 前置全部兄弟


  var prevAll = function prevAll() {
    var siblingNodes = [];

    if (this.length > 0) {
      // 寻找前面的同胞
      var preSibling = this.__DomTree__[this[0]].preNode;

      while (preSibling != null) {
        siblingNodes.unshift(preSibling);
        preSibling = this.__DomTree__[preSibling].preNode;
      }
    }

    return this.__new__(this.__DomTree__, siblingNodes);
  };

  var Search = {
    eq: eq,
    parent: parent,
    parents: parents,
    children: children,
    siblings: siblings,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll
  };

  var addItemIndex = function addItemIndex(item, index) {
    // 孩子结点
    for (var i = 0; i < item.childNodes.length; i++) {
      item.childNodes[i] += index;
    } // 前一个结点


    if (core_min.isNumber(item.preNode)) item.preNode += index; // 后一个结点

    if (core_min.isNumber(item.nextNode)) item.nextNode += index; // 父亲结点

    if (core_min.isNumber(item.parentNode)) item.parentNode += index;
    return item;
  };

  var mountItem = function mountItem(targetItem, sourceItem) {
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
      } // 如果是文本
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

  var _domitem = {
    addItemIndex: addItemIndex,
    mountItem: mountItem
  };
  var addItemIndex$1 = _domitem.addItemIndex,
      mountItem$1 = _domitem.mountItem; // 获取对象的模板

  var getTemplate = function getTemplate(target) {
    // 如果是文本结点
    if (target[0].type == 'text') return target[0].content;
    /**
     * 为了避免使用递归，我们定义一个计算数组needCalcs来登记已经计算过的结果和待计算的内容
     * 虽然需要频繁插入，可是感觉问题不大，并且数组的话，方便最后模板的获取
     * 
     * 算法思想：来自深度优先遍历树图
     * 
     */

    var needCalcs = [target.__DomTree__[target[0]]],
        index = 0,
        currentNode,
        attrsString,
        needReplace; // 如果还有没有处理的，继续

    while (index < needCalcs.length) {
      // 寻找第一个没有计算的
      do {
        currentNode = needCalcs[index++];
      } while (core_min.isString(currentNode));

      if (!currentNode) {
        break;
      }
      /**
       * 对当前面对的进行处理(计算当前模板)
       */
      //  如果是标签


      if (currentNode.type == 'tag') {
        attrsString = ""; // 只有是标签，属性一定存在

        for (var key in currentNode.attrs) {
          attrsString += "".concat(key, "=\"").concat(currentNode.attrs[key], "\" ");
        } // 这种情况稍微麻烦点，需要登记开头和结尾，而且需要插入孩子


        if (currentNode.__tagType__ == 'double') {
          needReplace = []; // 登记开头

          needReplace.push("<".concat(currentNode.name, " ").concat(attrsString, ">")); // 登记孩子

          for (var i = 0; i < currentNode.childNodes.length; i++) {
            needReplace.push(target.__DomTree__[currentNode.childNodes[i]]);
          } // 登记结尾


          needReplace.push("</".concat(currentNode.name, ">"));
          needCalcs.splice.apply(needCalcs, [index - 1, 1].concat(_toConsumableArray2(needReplace)));
        } // 如果不是有开始和结束标签的，一定没有孩子
        else {
            needCalcs[index - 1] = "<".concat(currentNode.name, " ").concat(attrsString, "/>");
          }
      } // 如果是文本
      else {
          needCalcs[index - 1] = currentNode.content;
        }
    }

    return needCalcs.join("");
  }; // 设置对象模板


  var setTemplate = function setTemplate(target, template) {
    var len = target.__DomTree__.length; // 追加维护的数组中

    for (var i = 1; i < template.length; i++) {
      template[i].__deep__ += target.__DomTree__[target[0]].__deep__ - 1;

      target.__DomTree__.push(addItemIndex$1(template[i], len - 1));
    } // 挂载到结点


    mountItem$1(target.__DomTree__[target[0]], addItemIndex$1(template[0], len - 1));
  };

  var _template = {
    getTemplate: getTemplate,
    setTemplate: setTemplate
  };
  var getTemplate$1 = _template.getTemplate,
      setTemplate$1 = _template.setTemplate; // 获取或设置innerHTML

  var innerHTML = function innerHTML(HTMLtemplate) {
    if (this.length <= 0) throw new Error('Null pointer!'); // 设置

    if (core_min.isString(HTMLtemplate)) {
      setTemplate$1(this, DomTree("<null-engine-frame>" + HTMLtemplate + "</null-engine-frame>"));
      return this;
    } // 获取
    else {
        var template = "",
            childNodes = this.children();

        for (var i = 0; i < childNodes.length; i++) {
          template += getTemplate$1(childNodes.eq(i));
        }

        return template;
      }
  }; // 获取或设置outerHTML


  var outerHTML = function outerHTML(HTMLtemplate) {
    if (this.length <= 0) throw new Error('Null pointer!'); // 设置

    if (core_min.isString(HTMLtemplate)) {
      setTemplate$1(this, DomTree(HTMLtemplate));
      return this;
    } // 获取
    else {
        return getTemplate$1(this);
      }
  }; // 属性的获取和设置


  var attr = function attr(name, value) {
    if (this.length <= 0) throw new Error('Null pointer!');

    if (arguments.length > 1) {
      this.__DomTree__[this[0]].attrs[name] = value;
      return this;
    } else {
      return this.__DomTree__[this[0]].attrs[name];
    }
  };

  var Operate = {
    innerHTML: innerHTML,
    outerHTML: outerHTML,
    attr: attr
  };

  var Engine = function Engine(template, indexs) {
    return new Engine.prototype.init(template, indexs);
  };

  Engine.prototype.init = function (template, indexs) {
    // 维护内置的tree
    this.__DomTree__ = core_min.isArray(template) ? template : DomTree(template); // 记录当前查询到的结点

    if (core_min.isArray(indexs)) {
      for (var i = 0; i < indexs.length; i++) {
        this[i] = indexs[i];
      }

      this.length = indexs.length;
    } else {
      this[0] = 0;
      this.length = 1;
    }

    return this;
  };

  Engine.prototype.__new__ = function (template, indexs) {
    return Engine(template, indexs);
  }; // 扩展引擎方法


  Engine.prototype.extend = function (source) {
    for (var key in source) {
      this[key] = source[key];
    }

    return this;
  };

  Engine.prototype.valueOf = function () {
    if (this.length <= 0) {
      return null;
    } else {
      var tag = this.__DomTree__[this[0]];
      return tag.type == 'text' ? tag.content : {
        tagName: tag.name,
        attrs: tag.attrs
      };
    }
  };

  Engine.prototype.toString = function () {
    var str = "[";

    for (var i = 0; i < this.length; i++) {
      var value = Engine(this.__DomTree__, [this[i]]).valueOf();
      str += (core_min.isString(value) ? value : JSON.stringify(value)) + ",";
    }

    return str.replace(/,$/, '') + "]";
  };
  /**
   * 扩展原型方法
   * -------------------------
   */


  var parent$1 = Search.parent,
      parents$1 = Search.parents,
      children$1 = Search.children,
      siblings$1 = Search.siblings,
      next$1 = Search.next,
      nextAll$1 = Search.nextAll,
      prev$1 = Search.prev,
      prevAll$1 = Search.prevAll,
      eq$1 = Search.eq;
  var innerHTML$1 = Operate.innerHTML,
      outerHTML$1 = Operate.outerHTML,
      attr$1 = Operate.attr;
  Engine.prototype.extend({
    // 结点查找
    parent: parent$1,
    parents: parents$1,
    children: children$1,
    siblings: siblings$1,
    next: next$1,
    nextAll: nextAll$1,
    prev: prev$1,
    prevAll: prevAll$1,
    eq: eq$1,
    // 属性等基本操作
    innerHTML: innerHTML$1,
    outerHTML: outerHTML$1,
    attr: attr$1
  });
  Engine.prototype.init.prototype = Engine.prototype;
  var xhtmlEngine = Engine;
  return xhtmlEngine;
});