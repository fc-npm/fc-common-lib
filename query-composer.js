"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromObject = fromObject;
exports.parseParamObject = parseParamObject;
exports.fromObjectArray = fromObjectArray;
exports.parseLine = parseLine;
exports.fromString = fromString;
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * convert obj like { a: 1, b:2, c: 3 } to 'a=1&b=2&c=3'.
 * @param {Object} input
 */
function fromObject(input) {
  if (_typeof(input) !== 'object' || input === null) {
    return '';
  }

  var result = '';
  var availableKeys = Object.keys(input).filter(function (key) {
    return typeof input[key] !== 'undefined';
  });

  for (var key in input) {
    if (typeof input[key] !== 'undefined') {
      result += "&".concat(key, "=").concat(input[key]);
    }
  }

  return result.slice(1);
}
/**
 * parse object array composed with type, name, value into 'name=value'
 * @param {Object} param1
 * @param {Function} exec
 */


function parseParamObject(_ref) {
  var type = _ref.type,
      name = _ref.name,
      value = _ref.value;
  var exec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value) {
    return value;
  };
  if (!name || !value) return '';

  switch (type) {
    case 'js':
      return "".concat(name, "=").concat(exec(value));

    default:
      return "".concat(name, "=").concat(value);
  }
}
/**
 * convert array consists of object which parsed by @see parseParamObject.
 * @param {Array} input
 * @param {Function} exec
 */


function fromObjectArray(input, exec) {
  if (!Array.isArray(input) || input.length === 0) {
    return '';
  }

  return input.map(function (item) {
    return parseParamObject(item, exec);
  }).filter(function (item) {
    return item;
  }).join('&');
}

function parseLine(input) {
  var exec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value) {
    return value;
  };

  if (!input) {
    return '';
  }

  return input.replace(/\{\{(.*)\}\}/, function (matched, matchedPart) {
    return exec(matchedPart);
  });
}
/**
 * convert text-area divided by '\n' into query params
 * @param {string} input
 */


function fromString(input, exec) {
  if (typeof input !== 'string') {
    return '';
  }

  var lines = input.split('\n');
  return lines.map(function (item) {
    return parseLine(item, exec);
  }).filter(function (item) {
    return item;
  }).join('&');
}

var _default = {
  fromString: fromString,
  fromObject: fromObject,
  fromObjectArray: fromObjectArray,
  parseLine: parseLine,
  parseParamObject: parseParamObject
};
exports["default"] = _default;