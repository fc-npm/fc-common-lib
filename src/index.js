/**
 * @flow
 */

/**
 * convert obj like { a: 1, b:2, c: 3 } to 'a=1&b=2&c=3'.
 * @param {Object} input
 */
export function fromObject(input: Object): string {
  if (typeof input !== 'object' || input === null) {
    throw new Error('illegal params');
  }

  let result = '';
  const availableKeys = Object.keys(input).filter((key) => typeof input[key] !== 'undefined');

  for (let key in input) {
    if (typeof input[key] !== 'undefined') {
      result += `&${key}=${input[key]}`;
    }
  }
  return result.slice(1);
}
