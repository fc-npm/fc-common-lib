/**
 * @flow
 */

/**
 * convert obj like { a: 1, b:2, c: 3 } to 'a=1&b=2&c=3'.
 * @param {Object} input
 */
export function fromObject(input: number): string {
  if (typeof input !== 'object' || input === null) {
    return '';
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

/**
 * parse object array composed with type, name, value into 'name=value'
 * @param {Object} param1
 * @param {Function} exec
 */
export function parseParamObject(
  {
    type,
    name,
    value,
  }: {
    type: string,
    name: string,
    value: any,
  },
  exec?: Function = (value) => value,
): string {
  if (!name || !value) return '';

  switch (type) {
    case 'js':
      return `${name}=${exec(value)}`;
    default:
      return `${name}=${value}`;
  }
}

/**
 * convert array consists of object which parsed by @see parseParamObject.
 * @param {Array} input
 * @param {Function} exec
 */
export function fromObjectArray(input: Array<Object>, exec?: Function): string {
  if (!Array.isArray(input) || input.length === 0) {
    return '';
  }

  return input
    .map((item) => parseParamObject(item, exec))
    .filter((item) => item)
    .join('&');
}

export function parseLine(input: string, exec?: Function = (value) => value): string {
  if (!input) {
    return '';
  }

  return input.replace(/\{\{(.*)\}\}/, (matched, matchedPart) => exec(matchedPart));
}

/**
 * convert text-area divided by '\n' into query params
 * @param {string} input
 */
export function fromString(input: string, exec?: Function): string {
  if (typeof input !== 'string') {
    return '';
  }
  const lines = input.split('\n');
  return lines
    .map((item) => parseLine(item, exec))
    .filter((item) => item)
    .join('&');
}
