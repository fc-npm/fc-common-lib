import { fromObject, fromObjectArray, parseParamObject } from '../src/query-composer';

describe('index', () => {
  // toBe: address or shallow compare
  // toEqual: value and deep compare

  test('fromObject', () => {
    expect(fromObject({ a: 1, b: 2, c: 3 })).toBe('a=1&b=2&c=3');
    expect(fromObject({})).toBe('');

    // you have to wrap a function here when testing exception
    expect(function() {
      fromObject();
    }).toThrow();
    expect(function() {
      fromObject(null);
    }).toThrow();
  });

  test('parseParamObject', () => {
    expect(parseParamObject({})).toBe('');
    expect(parseParamObject({ type: 'js', name: null, value: null })).toBe('');
    expect(parseParamObject({ type: 'xxx', name: 'id', value: '110' })).toBe('id=110');
    expect(parseParamObject({ type: 'text', name: 'name', value: 'poberwong' })).toBe(
      'name=poberwong',
    );
    expect(
      parseParamObject({ type: 'js', name: 'age', value: 23 }, (value) => (value > 20 ? 100 : 0)),
    ).toBe('age=100');
    expect(parseParamObject({ type: 'js', name: 'age', value: 23 })).toBe('age=23');
  });

  test('fromObjectArray', () => {
    expect(
      fromObjectArray(
        [
          { type: 'xxx', name: 'id', value: '110' },
          { type: 'text', name: 'name', value: 'poberwong' },
          { type: 'js', name: 'age', value: 23 },
        ],
        (value) => (value > 20 ? 100 : 0),
      ),
    ).toEqual('id=110&name=poberwong&age=100');
  });
});
