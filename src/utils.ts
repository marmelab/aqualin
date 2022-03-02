export function deepClone(object: Object): Object {
  return JSON.parse(JSON.stringify(object));
}
