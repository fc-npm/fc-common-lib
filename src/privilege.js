/**
 * 权限解释：
 *   7    6     5    4    3     2     1    0
 *  导出  导入  列表  删除  查看   编辑  新增  无权限
 * permissionCode 表示对应的二进制位
 * permissionValue 表示对应的十进制权限
 * @flow
 */
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';

const ACTION_PERMISSION_CODE_MAP = {
  ADD: 1,
  RELATEDADD: 1,
  EDIT: 2,
  UPDATE: 2,
  WIPE: 2,
  DELETE: 4,
};

export function checkAction(actionCode: string, permissions: any, objectApiName: string) {
  return checkObject(permissions, objectApiName, ACTION_PERMISSION_CODE_MAP[actionCode]);
}

/** ============================================== Base Function ============================================== */

/**
 * check whether the permissionValue is in okArr.
 * @param {Object} permissions user's total permissions
 * @param {*} objectApiName
 * @param {*} fieldApiName
 * @param {*} okArr collection contained permissionValues.
 */
export function checkFieldInOkArr(
  permissions: Object,
  objectApiName: string,
  fieldApiName: string,
  okArr: ?Array<number> = [4],
): boolean {
  if (isEmpty(objectApiName) || isEmpty(fieldApiName) || isEmpty(permissions)) {
    return false;
  }

  return indexOf(okArr, get(permissions, `field.${objectApiName}.${fieldApiName}`, 4)) >= 0;
}

/**
 * whether permissionValue has enough permission(expectedCode)
 * @param {any} permissions
 * @param {string} objectApiName
 * @param {any} expectedCode 0 - 7
 */
export function checkObject(permissions: any, objectApiName: string, expectedCode: any = 0) {
  if (isEmpty(objectApiName)) {
    return false;
  }

  const permissionValue = get(permissions, `obj.${objectApiName}`);
  return isPermissionEnough(permissionValue, expectedCode);
}

export function checkTab(permissionValue: number, expectedValue: number = 2) {
  return permissionValue === expectedValue;
}

/**
 * check whether permissionValue contains permissionCode
 * @param {number} permissionValue
 * @param {number} permissionCode
 */
export function isPermissionEnough(permissionValue: number, permissionCode: number) {
  return (permissionValue | Math.pow(2, permissionCode)) === permissionValue;
}

/**
 * check whether permissionCode is same to expectedCode
 * @param {number} permissionCode
 * @param {number} expectedCode
 */
export function checkCode(permissionCode: number, expectedCode: number) {
  return permissionCode === expectedCode;
}
