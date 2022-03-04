export function deepClone<T = any>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

export const columnLabel = (columnNumber: number): string => {
  let mod = Math.floor(columnNumber / 26);
  let rest = columnNumber % 26;
  let ret = "";
  if (mod > 0) {
    ret += columnNumberToString(mod - 1);
  }
  return ret + columnNumberToString(rest);
};

const ACharCode = 65;
const columnNumberToString = (i: number): string => {
  return String.fromCharCode(i + ACharCode);
};
