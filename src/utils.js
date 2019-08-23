export function isFunction(item) {
  return Object.prototype.toString.call(item).slice(8, -1) === 'Function';
}

export function isArray(item) {
  return Object.prototype.toString.call(item).slice(8, -1) === 'Array';
}