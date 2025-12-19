/**
 * @function 字母开头大写
 */
export function firstLetterToUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
