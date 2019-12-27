"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAction = checkAction;
exports.checkFieldInOkArr = checkFieldInOkArr;
exports.checkObject = checkObject;
exports.checkTab = checkTab;
exports.isPermissionEnough = isPermissionEnough;
exports.checkCode = checkCode;
exports["default"] = void 0;

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _get = _interopRequireDefault(require("lodash/get"));

var _indexOf = _interopRequireDefault(require("lodash/indexOf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 权限解释：
 *   7    6     5    4    3     2     1    0
 *  导出  导入  列表  删除  查看   编辑  新增  无权限
 * permissionCode 表示对应的二进制位
 * permissionValue 表示对应的十进制权限
 * 
 */
var ACTION_PERMISSION_CODE_MAP = {
  ADD: 1,
  RELATEDADD: 1,
  SAVE: 1,
  EDIT: 2,
  UPDATE: 2,
  WIPE: 2,
  DELETE: 4
};

function checkAction(actionCode, permissions, objectApiName, actionPermissionMap) {
  var permissionCode = ((0, _isEmpty["default"])(actionPermissionMap) ? ACTION_PERMISSION_CODE_MAP : actionPermissionMap)[actionCode];

  if (permissionCode === undefined) {
    return false;
  }

  return checkObject(permissions, objectApiName, permissionCode);
}
/** ============================================== Base Function ============================================== */

/**
 * check whether the permissionValue is in okArr.
 * @param {Object} permissions user's total permissions
 * @param {*} objectApiName
 * @param {*} fieldApiName
 * @param {*} okArr collection contained permissionValues.
 */


function checkFieldInOkArr(permissions, objectApiName, fieldApiName) {
  var okArr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [4];

  if ((0, _isEmpty["default"])(objectApiName) || (0, _isEmpty["default"])(fieldApiName) || (0, _isEmpty["default"])(permissions)) {
    return false;
  }

  return (0, _indexOf["default"])(okArr, (0, _get["default"])(permissions, "field.".concat(objectApiName, ".").concat(fieldApiName), 4)) >= 0;
}
/**
 * whether permissionValue has enough permission(expectedCode)
 * @param {any} permissions
 * @param {string} objectApiName
 * @param {any} expectedCode 0 - 7
 */


function checkObject(permissions, objectApiName) {
  var expectedCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if ((0, _isEmpty["default"])(objectApiName)) {
    return false;
  }

  var permissionValue = (0, _get["default"])(permissions, "obj.".concat(objectApiName));
  return isPermissionEnough(permissionValue, expectedCode);
}

function checkTab(permissionValue) {
  var expectedValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return permissionValue === expectedValue;
}
/**
 * check whether permissionValue contains permissionCode
 * @param {number} permissionValue
 * @param {number} permissionCode
 */


function isPermissionEnough(permissionValue, permissionCode) {
  var value = parseInt(permissionValue);
  var code = parseInt(permissionCode);

  if (isNaN(value) || isNaN(code)) {
    return false;
  }

  return (value | Math.pow(2, code)) === value;
}
/**
 * check whether permissionCode is same to expectedCode
 * @param {number} permissionCode
 * @param {number} expectedCode
 */


function checkCode(permissionCode, expectedCode) {
  return permissionCode === expectedCode;
}

var _default = {
  checkAction: checkAction,
  checkFieldInOkArr: checkFieldInOkArr,
  checkObject: checkObject,
  checkTab: checkTab,
  isPermissionEnough: isPermissionEnough,
  checkCode: checkCode
};
exports["default"] = _default;