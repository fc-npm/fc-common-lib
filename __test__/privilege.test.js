/**
 * 欢迎添加更多的单元测试增强程序健壮性
 */
import Privilege from '../src/privilege';

const { checkAction, checkObject, isPermissionEnough, checkFieldInOkArr } = Privilege;
// you can use Privilege.checkAction to invoke the function.

describe('privilege', () => {
  test('checkAction', () => {
    expect(checkAction('ADD', { 'obj.test': 3 }, 'test')).toBe(true);
    expect(checkAction('RELATEDADD', { 'obj.test': 3 }, 'test')).toBe(true);
    expect(checkAction('EDIT', { 'obj.test': 3 }, 'test')).toBe(false);
    expect(checkAction('EDIT', { 'obj.test': 4 }, 'test')).toBe(true);
    expect(checkAction('EDIT', { 'obj.test': 5 }, 'test')).toBe(true);
    expect(checkAction('E1DIT', { 'obj.test': 5 }, 'test')).toBe(false);
    expect(checkAction('E1DIT', { 'obj.test': 5 }, 'test', { E1DIT: 0 })).toBe(true);
  });

  test('checkObject', () => {
    expect(checkObject({ 'obj.23': 3 }, '23', 0)).toBe(true);
    expect(checkObject({ 'obj.23': 3 }, '23', 1)).toBe(true);
    expect(checkObject({ 'obj.23': 3 }, '23', 2)).toBe(false);
    expect(checkObject({ 'obj.test': 5 }, 'test', 0)).toBe(true);
  });

  test('checkFieldInOkArr', () => {
    expect(checkFieldInOkArr({ 'field.2.3': 3 }, '2', '3', [1, 2, 3, 4, 5, 6])).toBe(true);
    expect(checkFieldInOkArr({ 'field.2.3': 3 }, '2', '3', [])).toBe(false);
  });

  test('isPermissionEnough', () => {
    expect(isPermissionEnough(3, 0)).toBe(true);
    expect(isPermissionEnough(3, 1)).toBe(true);
    expect(isPermissionEnough(3, 2)).toBe(false);
    expect(isPermissionEnough(5, 0)).toBe(true);
    expect(isPermissionEnough('5', 0)).toBe(true);
    expect(isPermissionEnough('5', '0')).toBe(true);
  });
});
